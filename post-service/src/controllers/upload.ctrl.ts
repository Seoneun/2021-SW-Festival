import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import upload from '../middlewares/upload.middleware'

class UploadController implements Controller {
    public path = '/upload';
    public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // 이미지 업로드
        this.router.post(`${this.path}/style`,upload.single('style_img'), this.uploadOriginalImage);
        // 원본 이미지 업로드
        this.router.post(`${this.path}/original`,upload.single('original_img'), this.uploadStyleImage);
    };

    private uploadOriginalImage = async (req, res, next) => {
        const file = req.file; 

        // aws key 저장 필요
        res.json({
            sort: 'originalImg',
            url: file.location,
            name: file.originalname
        });
    };

    private uploadStyleImage = async(req,res,next) =>{
        const file = req.file
        
        // aws key 저장 필요
        res.json({
            sort: 'styleImg',
            url: file.location,
            name: file.originalname
        })
    };
}

export default UploadController;

