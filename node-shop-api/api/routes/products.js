const express = require("express");
const Product = require("./../models/product");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/", (req, res, next) => {

    Product.find()
        .then((docs) => res.status(201).json({ products: docs }))
        .catch(e => res.status(500).json({ message: e }))
})

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })

    product
        .save()
        .then(result => res.status(200).json({ result }))
        .catch(e => res.status(500).send({ message: e }))
})


router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .then(result => {
            if (result) {
                res.status(201).json({ product: result })
            } else {
                res.status(404).json({ message: `No valid entry found by provided Id: ${id}` })
            }

        })
        .catch(e => res.status(500).json({ message: e }))
})

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        .then(result => res.status(201).json({ product: result }))
        .catch(e => res.status(500).json({ message: e }))

    // res.status(200).json({
    //     message: 'Updated prodcut'
    // })
})

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndRemove(id)
        .then(result => res.status(200).json({ product: result }))
        .catch(e => res.status(500).json({ message: e }))
    // res.status(200).json({
    //     message: 'Deleted prodcut'
    // })
})

module.exports = router;