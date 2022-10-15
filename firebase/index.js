var firebase = require("firebase-admin");
var serviceAccount = require("../key.json");

firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
  });

//Creando base de datos y ina colección en esta
const db  = firebase.firestore();

module.exports = {
    db
}