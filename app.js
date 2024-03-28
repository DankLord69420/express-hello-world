const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;
const path = require('path');
const { google } = require('googleapis');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getDriveService = () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: TOKEN_PATH,
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  return google.drive({ version: 'v3', auth });
};

async function listFiles(authClient) {
  const drive = google.drive({ version: 'v3', auth: authClient });
  const res = await drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  });
  const files = res.data.files;
  if (files.length === 0) {
    console.log('No files found.');
    return [];
  }

  // Extract file information (id and name)
  const fileData = files.map((file) => ({ id: file.id, name: file.name }));

  // Return the array of file information
  return fileData;

}



// Create a connection pool
const pool = mysql.createPool({
  host: '195.35.53.19',
  user: 'u290118015_Insanity69',
  password: 'u.BnV@BNb95X@hP',
  database: 'u290118015_DB_Insanity',
  connectionLimit: 10,
  connectTimeout: 30000,
  acquireTimeout: 30000,
});

app.get('/api/listImage', async (req, res) => {
  try {
    // You might need to pass the authentication information to this function
    const authClient = getDriveService();

    // Call the listFiles function
    const files = await listFiles(authClient);

    // Respond with the list of files
    res.json(files);
  } catch (error) {
    console.error('Error listing files:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define your API endpoint
app.get('/api/fetch/:table/', (req, res) => {
  const { table } = req.params;

  // Acquire a connection from the pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    // Perform your query using the acquired connection
    const query = `SELECT * FROM \`${table}\` ORDER BY resultado DESC LIMIT 10`;
    connection.query(query, (error, results) => {
      // Release the connection back to the pool
      connection.release();

      if (error) {
        console.error("Error executing query:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    });
  });
});

app.use(express.json()); // Add this line to parse JSON in the request body

app.post('/api/insert/:table', (req, res) => {
  const { table } = req.params;
  const data = req.body;

  if (!data || !data.nome || !data.resultado) {
    return res.status(400).json({ error: "Bad Request. Incomplete data provided." });
  }

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const query = `INSERT INTO ${table} SET ?`; // Use SET to pass an object for insertion

    connection.query(query, data, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error executing query:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Data inserted successfully", results });
      }
    });
  });
});

app.get('/api/tables', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error getting MySQL connection:", err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const query = "SHOW TABLES";

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error("Error executing query:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const tables = results.map(result => Object.values(result)[0]);
        res.json({ tables });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
