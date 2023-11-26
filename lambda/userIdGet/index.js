const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql2/promise");
app.use(cors());
let connection;
exports.handler = async function (event, context) {
  try {
    // リクエストからユーザーIDを取得
    const userId = JSON.stringify(event.body);
    console.log(userId);

    // DB接続
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

    const response = {
      isBase64Encoded: false,
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(rows),
    };

    // 結果を返却
    console.log(JSON.stringify(response));
    return response;
  } catch (err) {
    console.error(err);
  } finally {
    // connection.end();
  }
};
