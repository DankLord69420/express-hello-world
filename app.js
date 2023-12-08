const express = require('express');
const app = express();
const cors = require('cors');
app.set('port', process.env.PORT || 8080);
app.use(express.json());
app.use(cors());

const touroRoute = require('./routes/touroRoutes');

app.use('/touro', touroRoute)

app.use('/', (req, res) => {
  res.send("Hello World!");
});