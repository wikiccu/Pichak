import { omit } from 'lodash';
import userModel from '../models/user.model.js';
import { excludedFields } from '../controllers/auth.controller.js';
import { signJwt } from '../../utils/jwt.js';
import redisClient from '../../utils/connectRedis.js';
// CreateUser service
export const createUser = async (input) => {
    const user = await userModel.create(input);
    return omit(user.toJSON(), excludedFields);
};
// Find User by Id
export const findUserById = async (id) => {
    const user = await userModel.findById(id).lean();
    return omit(user, excludedFields);
};
// Find All users
export const findAllUsers = async (previous, next) => {
    return await userModel.findPaged({ next, previous });
};
export const approveUsers = async (id, approve = false) => {
    return await userModel.findByIdAndUpdate(id, { approve }).lean();
};
// Find one user by any fields
export const findUser = async (query, options = {}) => {
    return await userModel.findOne(query, {}, options).select('+password');
};
// Sign Token
export const signToken = async (user) => {
    // Sign the access token
    const access_token = signJwt({ sub: user._id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get('accessTokenExpiresIn')}m`
    });
    // Sign the refresh token
    const refresh_token = signJwt({ sub: user._id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get('accessTokenExpiresIn')}m`
    });
    // Create a Session
    redisClient.set(user._id, JSON.stringify(user), {
        EX: 60 * 60
    });
    // Return access token
    return { access_token, refresh_token };
};
