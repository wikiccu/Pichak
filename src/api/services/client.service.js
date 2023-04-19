import { omit } from 'lodash';
import clientModel from '../models/client.model.js';
import { excludedFields } from '../controllers/auth.controller.js';
import { signJwt } from '../../utils/jwt.js';
import redisClient from '../../utils/connectRedis.js';
import { getOtp } from '../../utils/axios.js';
import requestModel from '../models/request.model.js';
// CreateUser service
export const createClient = async (input) => {
    const client = await clientModel.create(input);
    return omit(client.toJSON(), excludedFields);
};
// Find User by Id
export const findClientById = async (id) => {
    const user = await clientModel.findById(id).lean();
    return omit(user, excludedFields);
};
// Find All users
export const findAllUsers = async (previous, next) => {
    return await clientModel.findPaged({ next, previous });
};
export const approveUsers = async (id, approve = false) => {
    return await clientModel.findByIdAndUpdate(id, { approve }).lean();
};
// Find one user by any fields
export const findUser = async (query, options = {}) => {
    return await clientModel.findOne(query, {}, options);
};
export const setVerify = async (mobile) => {
    const verifyCode = await getOtp(mobile);
    redisClient.set(String(mobile), String(verifyCode), { EX: 120 });
};
export const checkVerify = async (mobile, code) => {
    const _code = await redisClient.get(mobile);
    return code === _code;
};
export const findOrCreateUser = async (clientData) => {
    const { mobile } = clientData;
    const client = await clientModel.findOne({ mobile });
    return (client != null) ? client : await clientModel.create({ mobile });
};
export const clientSignToken = async (client) => {
    // Sign the access token
    const access_token = signJwt({ sub: client._id }, 'accessTokenPrivateKey', {
        expiresIn: `${config.get('accessTokenExpiresIn')}m`
    });
    // Sign the refresh token
    const refresh_token = signJwt({ sub: client._id }, 'refreshTokenPrivateKey', {
        expiresIn: `${config.get('accessTokenExpiresIn')}m`
    });
    // Create a Session
    redisClient.set(client._id, JSON.stringify(client), {
        EX: 60 * 60
    });
    // Return access token
    return { access_token, refresh_token };
};
export const createRequest = async (input) => {
    const request = await requestModel.create(input);
    return omit(request.toJSON(), excludedFields);
};
export const approveClients = async (id, approve = false) => {
    return await clientModel.findByIdAndUpdate(id, { approve }, { new: true }).lean();
};
