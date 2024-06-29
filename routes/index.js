const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const Task = require("../models/task");
const ExcelJS = require("exceljs");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/export", async (req, res) => {
  const users = await User.find();
  const tasks = await Task.find().populate("userId");

  const workbook = new ExcelJS.Workbook();

  const userSheet = workbook.addWorksheet("Users");
  userSheet.columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Mobile", key: "mobile" },
    { header: "ID", key: "id" },
  ];
  users.forEach((user) => userSheet.addRow(user));

  const taskSheet = workbook.addWorksheet("Tasks");
  taskSheet.columns = [
    { header: "Task Name", key: "name" },
    { header: "Task Type", key: "type" },
    { header: "User ID", key: "userId" },
  ];
  tasks.forEach((task) =>
    taskSheet.addRow({ ...task._doc, userId: task.userId.name })
  );

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=users_tasks.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

module.exports = router;
