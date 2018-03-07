const express = require("express");

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'handling GET route /orders'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        quantity: req.body.quantity,
        productId: req.body.productId
    }
    res.status(201).json({
        message: 'handling POST route /orders',
        order
    })
})

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;

    res.status(200).json({
        message: 'Get one order'
    })
})

router.patch('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'updated order'
    })
})

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        message: 'Deleted order'
    })
})

module.exports = router;