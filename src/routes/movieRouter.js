const express = require("express");
const Movie = require("../modals/Movie");

const movieRouter = express.Router();

movieRouter.get('/movies', async (req, res) => {
    const movies = await Movie.find();
    res.status(200).send(movies)
})

movieRouter.post('/createMovies', async (req, res) => {
    try {
        const { title, dailyRentalRate, numberInStock, reviews, } = req.body
        const newMovie = Movie({ title, dailyRentalRate, numberInStock, reviews, })

        const result = await newMovie.save();
        res.status(200).json({ message: "Movie has been created", course: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


module.exports = movieRouter