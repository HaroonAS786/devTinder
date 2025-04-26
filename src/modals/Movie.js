const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
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
    },
    numberInStock:{
        type:Number,
        required:true,
        default:0,
    },
    reviews:{
        type:String,
        default:0,
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports=Movie;