const { required, types } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const authorSchema= new Schema({
    name:String,
    bio:String,
    website:String
})

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
    },  

    // Embedding documents
     author:{
        type:authorSchema,
        required:true
     },

    // Referencing the documents
    // author:{  
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'Author'
    // },
    // author: {
    //     type: String,
    //     validate: {
    //         validator: function (v) {
    //           return new Promise((resolve) => {
    //             setTimeout(() => {
    //               resolve(v && v.length > 0);
    //             }, 1000);
    //           });
    //         },
    //         message: 'Author name should not be empty',
    //       }
    // },
    tags: {
        type: [String],
        validate: {
            validator: function (v) {   // Custom validation
                return v && v.length > 0;
            },
            message: "A course should have at least one tag"
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: {
        type: Number,
        required: function () { return this.isPublished },
        min: 10,
        max: 200,
        get:v=>Math.round(v),
        set:v=>Math.round(v)
    },
    category: {
        type: String,
        required: true,
        enum: ["web", "mobile", "network"],
        lowercase:true,
        uppercase:true,
    },
})

const CourseModal = mongoose.model('Course', courseSchema)

module.exports = CourseModal;