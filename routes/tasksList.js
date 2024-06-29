const express = require("express");
const router = express.Router();
const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find().populate("userId", "name");
  res.render("tasksList", { tasks });
});

module.exports = router;
