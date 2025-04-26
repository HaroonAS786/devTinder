const express = require("express");
const CourseModal = require("../modals/Courses");
const AuthorModal = require("../modals/Author");

const courseRouter = express.Router();


courseRouter.get('/courses', async (req, res) => {

    //eq (equal)
    //ne (not equal)
    //gt (greater than)
    //gte (greater than equal)
    //lt (less than)
    //lte (less than equal to)
    // in
    // nin (not in)
    //    const pageNumber = 1;
    //    const pageSize = 10;
    try {

        // const courses= await CourseModal.find().limit(10).sort({name:1}).select({name:1,tags:1})
        // const courses= await CourseModal.find({price: {$in:[10,15,19,20.99,21]}}).limit(10)
        // const courses= await CourseModal.find()
        // const courses = await CourseModal
        // .find()
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)

        // const count=courses.length

        // .find({author: /^Mosh/})  
        // .find({author: /.*j.*/})    //logical query
        // .find({author: /hamdani$/i})   // regular expression
        // .or([{author:'Mosh'},{isPublished:false}])
        // .and([{author:'Mosh'},{isPublished:true}])
        // console.log(courses)

        // const courses = await CourseModal.find({ isPublished: true })
        //     .sort({ price: 1 }, { name: 1 })
        //     // .select({price:1,name:1})
        //     .select('price name author')
        const courses = await CourseModal
        .find()
        // .populate('author','name')  //used for Referencing objects
        .select('name author category')

        res.status(200).send({
            data: courses,
            // totalCount:count
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

courseRouter.get('/courses/:id', (req, res) => {
    // const findCourse = courses.find((val) => val.id == req.params.id)
    // if (!findCourse) return res.status(404).json("Course with this id not found")
    // res.status(200).send(findCourse)
})

courseRouter.post('/createCourse', async (req, res) => {
    try {
        // const author = await AuthorModal.findOne();
        // const { name, price, category, tags, isPublished } = req.body;
        // const course = new CourseModal({
        //     name,
        //     author:author._id,
        //     category,
        //     price,
        //     tags,
        //     isPublished,
        // });

        const { name, price, category, tags,author, isPublished } = req.body;
        const course = new CourseModal({
            name,
            author,
            category,
            price,
            tags,
            isPublished,
        });

        const result = await course.save();
        // const populatedCourse = await CourseModal.findById(result._id).populate('author');
        res.status(200).json({ message: "Course has been created", course: result });
    } catch (error) {
        console.log('err', JSON.stringify(error, null, 2));
        res.status(500).send({ error: error.message });
    }
});

courseRouter.put('/updateCourse/:id', async (req, res) => {
    try {
        // const course = await CourseModal.find((val) => val.id == req.params.id)
        const { name, author, price } = req.body
        const course = await CourseModal.findByIdAndUpdate(req.params.id, {
            $set: {
                name: name,
                author: author,
                price: price
            }
        }, { new: true })
        if (!course) return res.status(404).json("Course with this id not found")
        // const course = await CourseModal.updateMany({ _id: req.params.id }, {
        //     $set: {
        //         name: name,
        //         author: author,
        //         price: price
        //     }
        // })
        // const course = await CourseModal.findById(req.params.id)
        // if (!course) return res.status(404).json("Course with this id not found")
        // const { name, author, price } = req.body
        // course.set({
        //     name: name,
        //     author: author,
        //     price: price
        // })
        // const result = await course.save()
        // res.status(200).json({ message: "Course has been updated", course: result });
        res.status(200).json({ message: "Course has been updated", course: course });

    } catch (error) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

courseRouter.delete('/deleteCourse/:id', async (req, res) => {
    // const course = courses.find((val) => val.id == req.params.id)
    // if (!course) return res.status(404).json("Course with this id not found")
    // const index = courses.indexOf(course)
    // courses.splice(index, 1)
    // res.status(200).send(courses)
    try {
        const result = await CourseModal.deleteOne({ _id: req.params.id })
        // const result = await CourseModal.deleteMany({ price: {$lte:26.99} })
        // const result = await CourseModal.findByIdAndDelete(req.params.id)
        if (!result) return res.status(404).json("Course with this id not found")
        res.status(200).json({ message: "Course has been deleted", course: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


module.exports = courseRouter;