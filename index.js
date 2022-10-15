// Importando librerías necesarias
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var firebase = require("firebase-admin");

var serviceAccount = require("./key.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

//Creando base de datos y ina colección en esta
const db  = firebase.firestore();

//Creando app de express
const app = express();
const apiPort = 3003;

//Preparando/Seteando app de express
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(bodyParser.json());

//Creando endpoint
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/create-movie');

//READ
app.get('/get-movie/:id')

//DELETE
app.delete('/delete-movie/:id');

//UPDATE
app.put('/update-movie');

//GET MOVIES
app.get('/get-movies')

//Diciendole a la app que awante por nuevas llamadas y duerma cuando nadie llegue
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));