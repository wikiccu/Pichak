import jwt from 'jsonwebtoken';
export const signJwt = (payload, key, options = {}) => {
    const privateKey = Buffer.from(config.get(key), 'base64').toString('ascii');
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
};
export const verifyJwt = (token, key) => {
    try {
        const publicKey = Buffer.from(config.get(key), 'base64').toString('ascii');
        return jwt.verify(token, publicKey);
    }
    catch (error) {
        console.log({ error });
        return null;
    }
};
