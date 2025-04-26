const express = require("express");
const Rental = require("../modals/Rental");
const Customer = require("../modals/Customer");
const Movie = require("../modals/Movie");
const Joi = require("joi");
const rentalRouter = express.Router();


rentalRouter.get('/rentals', async (req, res) => {
    const rentals = await Rental.find();
    res.status(200).send(rentals)
})

rentalRouter.post('/createRentals', async (req, res) => {
    try {

        const {error}= validateRental(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const customer = await Customer.findById(req.body.customerId)
        if (!customer) return res.status(400).send("Customer not found")

        const movie = await Movie.findById(req.body.movieId)
        if (!movie) return res.status(400).send("Movie not found")

        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phoneNumber,
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate,
            }
        })
        movie.numberInStock--;
        movie.save()
        rental = await rental.save()
    
        res.status(200).send(rental)
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
})

function validateRental(rental){
    const schema= Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required(),
    })
    return schema.validate(rental);
}

module.exports = rentalRouter