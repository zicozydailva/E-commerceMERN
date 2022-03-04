const User = require("../models/User")
const jwt = require("jsonwebtoken")
const router = require("express").Router()

router.post("/register", async (req, res) => {
    try {
        const {username, email, password} = req.body
        if(!username || !email || !password) {
            res.status(401).json("All fields are required")
        }
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", async (req, res) => {
    try {
    
        const user = await User.findOne({email: req.body.email})
        !user && res.status(401).json("User is not registered")

        const correctPassword = await user.comparePassword(req.body.password)
        !correctPassword && res.status(401).json("Invalid login credentials")

        const accessToken = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SEC, {expiresIn: '3d'})

        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;