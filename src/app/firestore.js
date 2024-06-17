require('dotenv').config();
const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore({
    databaseId: '(default)',
    projectId: 'trashify-426015',
    keyFilename: process.env.KEYFILE_PATH,
});

module.exports = db;