const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Task = require("../models/task");

router.get("/add", async (req, res) => {
  try {
    const users = await User.find();
    res.render("addTask", { users });
  } catch (error) {
    res.status(500).send("Error retrieving users");
  }
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.redirect("/");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/user/:id", async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.id });
    res.send(tasks);
  } catch (error) {
    res.status(500).send("Error retrieving tasks");
  }
});

module.exports = router;
