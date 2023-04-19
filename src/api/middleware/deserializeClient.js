import { findClientById } from '../services/client.service';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { verifyJwt } from '../utils/jwt';
export const deserializeClient = async (req, res, next) => {
    try {
        // Get the token
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new AppError('You are not logged in', 401));
        }
        // Validate Access Token
        const decoded = verifyJwt(access_token, 'accessTokenPublicKey');
        if (decoded == null) {
            return next(new AppError('Invalid token or client doesn\'t exist', 401));
        }
        // Check if client has a valid session
        const session = await redisClient.get(decoded.sub);
        if (!session) {
            return next(new AppError('client session has expired', 401));
        }
        // Check if client still exist
        const client = await findClientById(JSON.parse(session)._id);
        if (!client) {
            return next(new AppError('client with that token no longer exist', 401));
        }
        if (!client.approve) {
            return next(new AppError('client must be approved by the admin', 405));
        }
        // This is really important (Helps us know if the client is logged in from other controllers)
        // You can do: (req.client or res.locals.client)
        res.locals.user = client;
        next();
    }
    catch (err) {
        next(err);
    }
};
