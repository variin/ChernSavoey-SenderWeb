const admin = require('firebase-admin');
const serviceAccount = require('./it60-42-choen-savoey-59a3efed1682.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const db = admin.firestore();

module.exports = db;