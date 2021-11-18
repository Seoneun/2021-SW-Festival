import * as mysql from 'mysql2';
import { Pool } from 'mysql2'; 

// 커넥션 풀
 
let pool: Pool;
switch (process.env.NODE_ENV) {
    case 'development':
        pool = mysql.createPool({
            host: process.env.DATABASE_HOST || "localhost",
            user: "root",
            port:3306,
            password: "db11",
            database: "ClothingDB",
            connectionLimit: 10,
            dateStrings: "date"
        });
}
 
export default  pool;