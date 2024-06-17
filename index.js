const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
require('./src/app/firebase');
require('./src/app/firestore');
const authController = require('./src/controllers/authController');
const historyController = require('./src/controllers/historyController');
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

// Gunakan controller auth
// app.use('/auth', authController);
// app.use('/user', historyController);

app.use(routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});