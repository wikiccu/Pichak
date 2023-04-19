import { approveClients } from '../services/client.service.js';
import { findAllUsers, approveUsers } from '../services/user.service.js';
export const getMeHandler = (req, res, next) => {
    try {
        const client = res.locals.user;
        res.status(200).json({
            status: 'success',
            data: client
        });
    }
    catch (err) {
        next(err);
    }
};
export const getAllUsersHandler = async (req, res, next) => {
    try {
        const users = await findAllUsers(req.query.previous, req.query.next);
        res.status(200).json({
            status: 'success',
            ...users
        });
    }
    catch (err) {
        next(err);
    }
};
export const approveUserByAdmin = async (req, res, next) => {
    try {
        const { id, approve } = req.body;
        const user = await approveUsers(id, approve);
        res.status(200).json({
            status: 'success',
            ...user
        });
    }
    catch (err) {
        next(err);
    }
};
export const approveClientsByAdmins = async (req, res, next) => {
    try {
        const { id, approve } = req.body;
        const user = await approveClients(id, approve);
        res.status(200).json({
            status: 'success',
            ...user
        });
    }
    catch (err) {
        next(err);
    }
};
