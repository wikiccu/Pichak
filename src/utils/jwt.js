import jwt from 'jsonwebtoken'
import { appConfig } from '../config/variables.js'
export const signJwt = (payload, key, options = {}) => {
  const privateKey = Buffer.from(key === 'accessTokenPrivateKey' ? appConfig.accessTokenPrivateKey : appConfig.refreshTokenPrivateKey, 'base64').toString('ascii')
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  })
}
export const verifyJwt = (token, key) => {
  try {
    const publicKey = Buffer.from(key === 'accessTokenPublicKey' ? appConfig.accessTokenPublicKey : appConfig.refreshTokenPublicKey, 'base64').toString('ascii')
    return jwt.verify(token, publicKey)
  } catch (error) {
    console.log({ error })
    return null
  }
}
