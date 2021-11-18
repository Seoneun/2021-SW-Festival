import * as multerS3 from 'multer-s3';
import * as multer from 'multer';
import AWS from '../config/aws.config'; 

const storage = multerS3({
    s3: new AWS.S3(),
    bucket: 'ywoosang-s3',
    key(req, file, cb) {
        const filePathName = `${Date.now()}-${file.originalname}`;
        cb(null, filePathName);
    }
});

const upload = multer({
    storage
});

export default upload;