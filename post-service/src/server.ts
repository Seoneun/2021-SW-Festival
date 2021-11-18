import App from './app';
import UploadController from './controllers/upload.ctrl'; 
 
const app = new App(
  [
    new UploadController()
  ]
);

app.listen();
