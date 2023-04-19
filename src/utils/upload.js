import path from 'path';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'temp');
    },
    filename: function (req, file, cb) {
        cb(null, `${Math.floor(Math.random() * 9999)}-${file.fieldname}-${Date.now()}.jpg`);
    }
});
const maxSize = 2 * 1000 * 1000;
export const uploader = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const error = 'Error: File upload only supports the ' + 'following filetypes - ' + filetypes;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(error);
    }
}).single('mypic');
