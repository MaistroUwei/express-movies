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

app.post('/create', async (req, res) => {
    try{
        const {body: movie } = req;
        const moviesDB = db.collection('movies');   
        const { _path: { sengments } } = await moviesDB.add(movie);
        const id = sengments[1];
        res.send({
            status: 200,
            id
        });
    }catch (error){
        res.send(error);

    }
});

//READ
app.get('/get-movie/:id', async (req, res) => {
    try {
        const {params : { id }} = req;
        const moviesDB = db.collection('movies').doc(id);
        const { _fieldsProto : { time, author, name, rating }} = await moviesDB.get();
        res.send({
            status: 200,
            time: time.stringValue,
            author: author.stringValue,
            name: name.stringValue,
            rating: rating.stringValue
        })
    }catch(error){
        res.send(error);
    }
})

//DELETE
app.delete('/delete-movie/:id', async (req, res) => {
    try {
        const { params : { id }} = req;
        const movieDB = db.collection('movies').doc(id);
        await movieDB.delete();
        res.send({
            status: 200
        });
    }catch(error){
        res.send(error);
    }
});

//UPDATE
app.put('/update-movie', async (req, res) => {
    try{
        const {body: movie } = req;
        const { id, time, author, name, rating } = movie;
        const movieDB = db.collection('movies').doc(id);   
        const resp = await movieDB.update({
            name,
            time,
            rating,
            author
        });
        res.send({
            status: 200,
            id
        });
    }catch (error){
        res.send(error);

    }
});

//GET MOVIES
app.get('/get-movies', async (req, res) => {
    try {
        const moviesDB = await db.collection('movies').get();
        const resp = moviesDB.docs.map(doc => doc.data());
        res.send({
            resp
        })
    }catch(error){
        res.send(error);
    }
})

//Diciendole a la app que awante por nuevas llamadas y duerma cuando nadie llegue
app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));