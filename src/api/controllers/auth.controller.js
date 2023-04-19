import { checkVerify, findOrCreateUser, setVerify, clientSignToken, findClientById } from '../services/client.service.js'
import { createUser, findUser, findUserById, signToken } from '../services/user.service.js'
import { appConfig } from '../../config/variables.js'
import AppError from '../../utils/appError.js'
import redisClient from '../../utils/connectRedis.js'
import { signJwt, verifyJwt } from '../../utils/jwt.js'
// Exclude this fields from the response
export const excludedFields = ['password']
// Cookie options
const accessTokenCookieOptions = {
  expires: new Date(Date.now() + appConfig.accessTokenExpiresIn * 60 * 1000),
  maxAge: appConfig.accessTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}
const refreshTokenCookieOptions = {
  expires: new Date(Date.now() + appConfig.refreshTokenExpiresIn * 60 * 1000),
  maxAge: appConfig.refreshTokenExpiresIn * 60 * 1000,
  httpOnly: true,
  sameSite: 'lax'
}
accessTokenCookieOptions.secure = true
export const registerHandler = async (req, res, next) => {
  try {
    const user = await createUser({
      username: req.body.username,
      name: req.body.name,
      family: req.body.family,
      mobile: req.body.mobile,
      password: req.body.password
    })
    res.status(201).json({
      status: 'success',
      data: {
        user
      }
    })
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: 'fail',
        message: 'Duplicate error,mobile or username'
      })
    }
    next(err)
  }
}
export const registerWithOtpHandler = async (req, res, next) => {
  try {
    await setVerify(req.body.mobile)
    res.status(201).json({ status: 'success' })
  } catch (err) {
    next(err)
  }
}
export const loginHandler = async (req, res, next) => {
  try {
    // Get the user from the collection
    const user = await findUser({ username: req.body.username })
    // Check if user exist and password is correct
    if ((user == null) ||
            !(await user.comparePasswords(user.password, req.body.password))) {
      return next(new AppError('Invalid username or password', 401))
    }
    // Create the Access and refresh Tokens
    const { access_token, refresh_token } = await signToken(user)
    // Send Access Token in Cookie
    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false
    })
    // Send Access Token
    res.status(200).json({
      status: 'success',
      access_token,
      refresh_token
    })
  } catch (err) {
    next(err)
  }
}
export const clientLoginHandler = async (req, res, next) => {
  try {
    // Get the user from the collection
    const userVerified = await checkVerify(req.body.mobile, req.body.code)
    // Check if user exist and password is correct
    if (userVerified) {
      // Create the Access and refresh Tokens
      const user = await findOrCreateUser(req.body)
      const { access_token, refresh_token } = await clientSignToken(user)
      // Send Access Token in Cookie
      res.cookie('access_token', access_token, accessTokenCookieOptions)
      res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions)
      res.cookie('logged_in', true, {
        ...accessTokenCookieOptions,
        httpOnly: false
      })
      // Send Access Token
      res.status(200).json({
        status: 'success',
        access_token,
        refresh_token
      })
    } else {
      res.status(400).json({
        status: 'failed',
        message: 'The verify code is incorrect '
      })
    }
  } catch (err) {
    next(err)
  }
}
// Refresh tokens
const logout = (res) => {
  res.cookie('access_token', '', { maxAge: 1 })
  res.cookie('refresh_token', '', { maxAge: 1 })
  res.cookie('logged_in', '', {
    maxAge: 1
  })
}
export const refreshAccessTokenHandler = async (req, res, next) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = req.cookies.refresh_token
    // Validate the Refresh token
    const decoded = verifyJwt(refresh_token, 'refreshTokenPublicKey')
    const message = 'Could not refresh access token'
    if (decoded == null) {
      return next(new AppError(message, 403))
    }
    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub)
    if (!session) {
      return next(new AppError(message, 403))
    }
    // Check if the user exist
    const user = await findUserById(JSON.parse(session)._id)
    if (!user) {
      return next(new AppError(message, 403))
    }
    // Sign new access token
    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
      expiresIn: `${appConfig.accessTokenExpiresIn}m`
    })
    // Send the access token as cookie
    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false
    })
    // Send response
    res.status(200).json({
      status: 'success',
      access_token
    })
  } catch (err) {
    next(err)
  }
}
export const clientRefreshAccessTokenHandler = async (req, res, next) => {
  try {
    // Get the refresh token from cookie
    const refresh_token = req.cookies.refresh_token
    // Validate the Refresh token
    const decoded = verifyJwt(refresh_token, 'refreshTokenPublicKey')
    const message = 'Could not refresh access token'
    if (decoded == null) {
      return next(new AppError(message, 403))
    }
    // Check if the user has a valid session
    const session = await redisClient.get(decoded.sub)
    if (!session) {
      return next(new AppError(message, 403))
    }
    // Check if the user exist
    const client = await findClientById(JSON.parse(session)._id)
    if (!client) {
      return next(new AppError(message, 403))
    }
    // Sign new access token
    const access_token = signJwt({ sub: client._id }, 'accessTokenPrivateKey', {
      expiresIn: `${appConfig.accessTokenExpiresIn}m`
    })
    // Send the access token as cookie
    res.cookie('access_token', access_token, accessTokenCookieOptions)
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false
    })
    // Send response
    res.status(200).json({
      status: 'success',
      access_token
    })
  } catch (err) {
    next(err)
  }
}
export const logoutHandler = async (req, res, next) => {
  try {
    const user = res.locals.user
    await redisClient.del(user._id)
    logout(res)
    return res.status(200).json({ status: 'success' })
  } catch (err) {
    next(err)
  }
}
