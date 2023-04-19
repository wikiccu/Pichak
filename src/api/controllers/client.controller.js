import { uploader } from '../utils/upload';
import fs from 'fs';
import { createRequest } from '../services/client.service';
import { moveToUploadFolder } from '../utils/general';
export const getMeHandler = (req, res, next) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
            status: 'success',
            data: user
        });
    }
    catch (err) {
        next(err);
    }
};
export const clientUpload = (req, res, next) => {
    try {
        uploader(req, res, async function (err) {
            if (!req.file) {
                return res.status(400)
                    .json({ status: 'fail', message: 'file not found' });
            }
            if (err) {
                res.status(500)
                    .json({
                    status: 'fail',
                    message: 'upload proccess failed',
                    reason: String(err)
                });
            }
            else {
                res.status(200)
                    .json({
                    status: 'success',
                    message: 'file uploaded successfully',
                    filename: req.file.filename
                });
            }
        });
    }
    catch (err) {
        next(err);
    }
};
export const clientRequestForWaste = async (req, res, next) => {
    try {
        await moveToUploadFolder(req.body.files);
        const data = await createRequest({
            client: res.locals.user._id,
            files: req.body.files,
            lat: req.body.lat,
            long: req.body.long,
            description: req.body.description,
            address: req.body.address
        });
        res.status(200)
            .json({
            status: 'success',
            message: 'request received successfully',
            data
        });
    }
    catch (err) {
        next(err);
    }
};
export const clientDownload = (req, res, next) => {
    try {
        if (fs.existsSync(`./uploads/${req.query.filename}`))
            res.download(`./uploads/${req.query.filename}`);
        else
            res.status(400).json({ status: 'fail', message: 'file not found' });
    }
    catch (err) {
        next(err);
    }
};
