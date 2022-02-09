const router = require("express").Router();
const User = require("../models/User");
router.post("/register", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const saveUser = await user.save();
    res.status(201).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
