import mysql from "mysql2";
import "dotenv/config";

const db = mysql.createConnection(process.env.MYSQL_PUBLIC_URL);

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

db.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});

export default db;