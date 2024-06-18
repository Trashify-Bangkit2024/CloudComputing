const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./src/app/firebase');
require('./src/app/firestore');
const routes = require('./src/routes/routes');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// controllers
app.use(routes);

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 8080;

app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});