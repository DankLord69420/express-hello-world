const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const connection = mysql.createConnection({
  host: '195.35.53.19',
  user: 'u290118015_Insanity69',
  password: 'u.BnV@BNb95X@hP',
  database: 'u290118015_DB_Insanity',
  connectionLimit: 10,
  connectTimeout: 30000,
  acquireTimeout: 30000,
});

try {
  connection.connect();
} catch (error) {
  console.error("Error connecting to MySQL:", error.message);
}

app.get('/api/fetch/:table/', (req, res) => {
  const { table } = req.params;

  const query = `SELECT * FROM ${table} ORDER BY resultado DESC LIMIT 10`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });

});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});