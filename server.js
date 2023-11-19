const express = require("express");
const app = express();
const PORT = 5001;

const cors = require("cors");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.MYSQL_ID,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB_QUIZ,
});

db.connect(function (err) {
  // 接続確認
  if (err) {
    console.log("connection failed...");
    throw err;
  }
  console.log("connection succeed!");
});

app.use(cors());

// Usersテーブル作成クエリ
const createUsersTableSql =
  "CREATE TABLE IF NOT EXISTS users(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";
const selectUsersSql = "SELECT * FROM users";

app.get("/api/get/users", (req, res) => {
  // Create Table
  db.query(createUsersTableSql, function (err, result) {
    if (err) {
      console.log("Failed Create Table...");
    }
    console.log("Success Create Table!!!");
  });

  db.query(selectUsersSql, function (err, result) {
    if (err) {
      console.log("Failed Select Table...");
    }
    res.send(result);
  });
});

// ローカルサーバを立ち上げる
app.listen(PORT, () => {
  console.log("サーバを起動中・・・");
});
