const express = require("express");
const Customer = require("../modals/Customer");

const customerRouter = express.Router();

customerRouter.get('/customers', async (req, res) => {
    const customers = await Customer.find();
    res.status(200).send(customers)
})

customerRouter.post('/createCustomer', async (req, res) => {

    // console.log('req.body', JSON.stringify(req.body, null, 2))
    try {
        const { name, isGold, phoneNumber, address, state } = req.body
        const newCustomer = Customer({ name, isGold, phoneNumber, address, state })

        const result = await newCustomer.save();
        res.status(200).json({ message: "Customer has been created", course: result });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
})


module.exports = customerRouter