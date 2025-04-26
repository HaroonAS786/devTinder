const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authorSchema= new Schema({
    name:String,
    bio:String,
    website:String
})

const AuthorModal = mongoose.model('Author', authorSchema)

module.exports = AuthorModal;