const FS = require('../firebase');

const { db } = FS;
const createMovie = async (req, res) => {
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
}

const getMovie = async (req, res) => {
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
}

const deleteMovie = async (req, res) => {
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
}

const updateMovie = async (req, res) => {
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
}

const getMovies = async (req, res) => {
    try {
        const moviesDB = await db.collection('movies').get();
        const resp = moviesDB.docs.map(doc => doc.data());
        res.send({
            resp
        })
    }catch(error){
        res.send(error);
    }
}

module.exports = {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getMovies
}