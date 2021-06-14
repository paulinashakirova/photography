require("dotenv").config();
import { createConnection } from "mysql";

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "photography",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists topics; CREATE TABLE topics(id INT NOT NULL AUTO_INCREMENT, title VARCHAR(40) not null, description VARCHAR(40) not null, PRIMARY KEY (id));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `topics` was successful!");

    console.log("Closing...");
  });

  con.end();
});
