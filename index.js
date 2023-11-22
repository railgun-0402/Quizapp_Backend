const express = require("express");
const app = express();
const PORT = 5001;

const cors = require("cors");
const mysql = require("mysql2/promise");
let connection;
exports.handler = async function (event, context) {
  try {
    const userId = event.id;
    connection = await mysql.createConnection({
      host: process.env.MYSQL_GET_USERS_RDS,
      user: process.env.MYSQL_ADMINI,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB_QUIZ,
      port: 3306,
    });
    // Users情報取得
    let selectUsersSql = `SELECT * FROM users WHERE id=${userId}`;

    // クエリ実行
    const [rows, fields] = await connection.execute(selectUsersSql);
    console.log("Query Result:", rows);
    app.use(cors());
  } catch (err) {
    console.error(err);
  } finally {
    // connection.end();
  }
};
