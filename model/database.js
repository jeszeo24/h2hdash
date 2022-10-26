require("dotenv").config();
const mysql = require("mysql");
const fs = require("fs"); // this is new
// NOTE: fs is an abbreviation for file system
// contains package for reading and writing files, moving around directories

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS,
  database: DB_NAME || "h2hdash",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =  fs.readFileSync(__dirname+"/init_db.sql").toString();
  // NOTE: Below SQL instructions is replaced with fs.readFileSync(__dirname+"/init_db.sql").toString(); 
  // as we have created the init_db.sql under model folder
  // starting from current directory, will look for a file of init_db.sql and will execute that
  // "DROP TABLE if exists students; CREATE TABLE students(id INT NOT NULL AUTO_INCREMENT, firstname VARCHAR(40) not null, lastname VARCHAR(40) not null, PRIMARY KEY (id));";
  con.query(sql, function(err, result) {
    if (err) throw err;

    console.log("Closing...");
  });

  con.end();
});
