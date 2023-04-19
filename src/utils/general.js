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
export const omit = (client, excludedFields) => {
    const clientData = client.toJSON();
    const filteredClientData = Object.keys(clientData)
        .filter(key => !excludedFields.includes(key))
        .reduce((obj, key) => {
            obj[key] = clientData[key];
            return obj;
        }, {});
    return filteredClientData;
}
