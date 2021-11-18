import * as AWS from 'aws-sdk'; 
import * as dotenv from 'dotenv'; 
dotenv.config(); 
 
AWS.config.update({
    apiVersion: "2010-12-01",
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_KEY_ID,
    region: 'ap-northeast-2',
});

export default AWS;