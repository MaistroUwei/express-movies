const express = require('express');

const {
    createMovie,
    getMovie,
    deleteMovie,
    updateMovie,
    getMovies } = require('../controllers');

    const router = express.Router();

    router.post('/create-movie', createMovie);
    router.get('/get-movie/:id', getMovie);
    router.delete('/delete-movie/:id', deleteMovie);
    router.put('/update-movie', updateMovie);
    router.get('/get-movies', getMovies);

    module.exports = {
        router
    }