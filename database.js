const admin = require("firebase-admin");
const config  =require("./config/config.dev.json");

admin.initializeApp({
    credential: admin.credential.cert(config.database.adminsdk),
    databaseURL: config.database.databaseurl
  });
  
var db = admin.firestore();


module.exports= db


