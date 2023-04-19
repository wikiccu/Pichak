import mongoose from "mongoose";
import fs from 'fs';
export const toObjectId = (id) => new mongoose.Types.ObjectId(id);
export const moveToUploadFolder = (files) => {
    return new Promise((resolve) => {
        for (const file of files) {
            fs.renameSync(`./temp/${file}`, `./uploads/${file}`);
        }
        resolve('done');
    });
};
