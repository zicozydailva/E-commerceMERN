const Product = require("../models/Product")
const { verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()


// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.find({})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post("/", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post("/", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post("/", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;