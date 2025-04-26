const Joi = require("joi");
const { required } = require("joi");
const mongoose = require("mongoose");
const { trim } = require("validator");
const Schema = mongoose.Schema;


const customersSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        maxlength: 11
    }

})
const moviesSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 0,
        maxlength: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
})
const rentalSchema = new Schema({
    customer: {
        type: customersSchema,
        required: true
    },
    movie: {
        type: moviesSchema,
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date,
    },
    rentalFee: {
        type: Number,
        min: 0
    }
})

const Rental = mongoose.model('Rental', rentalSchema)

module.exports = Rental;
