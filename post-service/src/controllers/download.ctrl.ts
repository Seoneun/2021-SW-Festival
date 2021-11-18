import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import upload from '../middlewares/upload.middleware'

class DownloadController implements Controller {
    public path = '/post/download';
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

    private downloadImg = async(req,res,next) =>{ 
        try{
            const id = req.query.id;
            const file = await File.findOne({
                where: {
                    id
                }
            });
            const Key = file.awsKey;
            // 버킷의 데이터를 읽어온다. 
            // const data =    .
            const f = s3.getObject({
                Bucket : 'ywoosang-s3',
                Key 
            }).createReadStream(); 
            res.setHeader('Content-disposition', 'attachment; filename=' + getDownloadFilename(req,file.name));
            function getDownloadFilename(req, filename) {
                var header = req.headers['user-agent'];
                if (header.includes("MSIE") || header.includes("Trident")) { 
                    return encodeURIComponent(filename).replace(/\\+/gi, "%20");
                } else if (header.includes("Chrome")) {
                    return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
                } else if (header.includes("Opera")) {
                    return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
                } else if (header.includes("Firefox")) {
                    return iconvLite.decode(iconvLite.encode(filename, "UTF-8"), 'ISO-8859-1');
                }
                return filename;
            }
            res.setHeader('Content-type',file.mimetype.toString()); // 파일 형식 지정
            f.pipe(res); 
    
        } catch (err){
            next(err); 
        }
    }    
}

export default DownloadController;

