var admin = require("firebase-admin");
var serviceAccount = require("./jobjod-production-firebase-adminsdk.json");

admin.initializeApp({
  apiKey: "AIzaSyBhyEk7y8b93tw95UHzMfntr_fBOcZNB6o",
  authDomain: "jobjod-bd9e4.firebaseapp.com",
  projectId: "jobjod-bd9e4",
  storageBucket: "jobjod-bd9e4.appspot.com",
  messagingSenderId: "1090079926898",
  appId: "1:1090079926898:web:a2a71f17c88d8c329eb0eb",
  measurementId: "G-KC1LFQZJF1",
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
