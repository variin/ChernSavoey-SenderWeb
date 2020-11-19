const admin = require('firebase-admin');
// const firestoreService = require('firestore-export-import');
const serviceAccount = require('./it60-42-choen-savoey-59a3efed1682.json');

// const appName = '[DEFAULT]';
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// firestoreService.initializeApp(serviceAccount, appName);

// firestoreService
//   .backups(['store', 'users']) // Array of collection's name is OPTIONAL
//   .then((collections) => {
//     // You can do whatever you want with collections
//     console.log(JSON.stringify(collections));
//   });

const db = admin.firestore();

module.exports = db;