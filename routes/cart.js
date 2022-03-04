const Cart = require('../models/Cart');
const { verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router()

// GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const cart = await Cart.find({})
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;