const express = require("express");
const AuthorModal = require("../modals/Author");


const authorRouter = express.Router();

authorRouter.post('/createAuthor', async (req, res) => {
    try {
        const { name, bio,website } = req.body;
        // if (!name || name.length < 6) {
        //     return res.status(400).json({ error: "Name should be at least 6 characters long." });
        // }
        const author = new AuthorModal({
            name, bio,website
        });
        // await course.validate(); // optional: validate only
        const result = await author.save();
        res.status(200).json({ message: "Author has been created", author: result });
    } catch (error) {
        console.log('err', JSON.stringify(error, null, 2))
        res.status(500).send({ error: error.message });
    }
});


module.exports = authorRouter;