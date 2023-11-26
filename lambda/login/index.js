const express = require("express");
const app = express();

const cors = require("cors");
const mysql = require("mysql2/promise");
app.use(cors());
let connection;

exports.handler = async function (event, context) {
  try {
    // リクエストからユーザーIDを取得
    const userEmail = JSON.stringify(event.email);
    const userPass = JSON.stringify(event.password);
    console.log(userEmail);
    console.log(userPass);

    // DB接続
    connection = await mysql.createConnection({
      host: process.env.MYSQL_GET_USERS_RDS,
      user: process.env.MYSQL_ADMINI,
      password: process.env.MYSQL_PW,
      database: process.env.MYSQL_DB_QUIZ,
      port: 3306,
    });

    // Users情報取得
    // TODO: Email、Passどちらも満たすユーザーにのみにしたい
    let selectUsersSql = `SELECT * FROM users WHERE email=${userEmail} AND password=${userPass}`;
    // クエリ実行
    const [rows, fields] = await connection.execute(selectUsersSql);
    if (rows.length === 0) {
      console.log("入力したユーザーは存在しません");
      throw err;
    }
    console.log("Login Query Result:", rows);

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
  } catch (error) {
    console.error(error);
  }
};
