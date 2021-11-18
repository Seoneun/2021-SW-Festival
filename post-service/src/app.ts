import * as express from 'express';
import * as morgan from 'morgan';
import * as dotenv from 'dotenv';
import * as cors from 'cors';

dotenv.config();

class App {
    public app: express.Application;
    public port: number | string;

    constructor(controllers) {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        if(process.env.NODE_ENV === "development") {
            this.app.use(cors());
            this.app.use(morgan("dev"));
        }
        // parse application/json 파싱
        this.app.use(express.json());
        //  application/x-www-form-urlencoded 파싱
        this.app.use(express.urlencoded({
            extended: true
        }));
        this.app.use((error, req, res, next) => {
            // 에러 로깅
            console.log(error); 
            // AJAX 요청인 경우
            if (req.is('json') || req.is('multipart/form-data')) {
              res.status(500).json({ message: '시스템 오류가 발생하였습니다.' });
            }
        }); 
    }

    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/api/post', controller.router);
        });
    }

    // private connectToDatabase() {
    //     // For pool initialization 
    //     pool.getConnection((err, connection) => {
    //         if (err) {
    //             switch (err.code) {
    //                 case "PROTOCOL_CONNECTION_LOST":
    //                     console.error("Database connection was closed.");
    //                     break;
    //                 case "ER_CON_COUNT_ERROR":
    //                     console.error("Database has too many connections.");
    //                     break;
    //                 case "ECONNREFUSED":
    //                     console.error("Database connection was refused.");
    //                     break;
    //             }
    //         } else if (connection) {
    //             console.log('Database connected');
    //             return connection.release();
    //         } else {
    //             console.log('Database connection failed')
    //         }
    //     });
    // }
 
    public getServer() {
        return this.app;
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on http://localhost:${this.port}`)
        });
    }
}

export default App;
