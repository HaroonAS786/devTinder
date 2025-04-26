
const mongoose = require("mongoose");
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
        required:true,
    },
    phoneNumber: {
        type: String,
        maxlength: 11,
        minlength:0
    },
    address:{
        type:String,
        minlength:0,
        maxlength:250
    },
    state:{
        type:String,
    }
})

const Customer = mongoose.model('Customer', customersSchema)
module.exports=Customer;