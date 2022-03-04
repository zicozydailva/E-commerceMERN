const Product = require("../models/Product")
const { verifyTokenAndAdmin } = require("./verifyToken")

const router = require("express").Router()


// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.create(req.body)
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


// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        res.status(200).json(`Product has been deleted: ${product}`)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET PRODUCT
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})


// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products
        if(qNew) {
            products = await Product.find({}).sort({createdAt: -1}).limit(1)

        } else if(qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory]
                }
            })
        } else {
            products = await Product.find({})
        }
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;