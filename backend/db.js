const mysql = require('mysql');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: "webcourse.cs.nuim.ie",
  user: "u240799",
  password: "UNigan2ohb6iefoh",
  database: "cs230_u240799"
});


db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});
module.exports = db;
