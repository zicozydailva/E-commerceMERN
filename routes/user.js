const User = require("../models/User");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    let users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET USER
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Successfully deleted")
    } catch (error) {
        res.status(500).json(error)
    }
} )

// UPDATE USER




module.exports = router;
