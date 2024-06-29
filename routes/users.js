const express = require("express");
const router = express.Router();
const { User, validateUser } = require("../models/user");

router.get("/add", (req, res) => {
  res.render("addUser");
});

router.post("/add", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = new User(req.body);
  try {
    await user.save();
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

module.exports = router;
