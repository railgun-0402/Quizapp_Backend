const express = require("express");
const app = express();
const PORT = 5001;

const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "",
  password: "",
  database: "",
});

db.connect(function (err) {
  // 接続確認
  if (err) {
    console.log("connection failed...");
    throw err;
  }
  console.log("connection succeed!");
});

// Usersテーブル作成クエリ
const createUsersTableSql =
  "CREATE TABLE IF NOT EXISTS users(id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)";

app.get("/", (req, res) => {
  res.send("Hello Node");
});

// ローカルサーバを立ち上げる
app.listen(PORT, () => {
  console.log("サーバを起動中・・・");
});
