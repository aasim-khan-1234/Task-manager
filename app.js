const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const hbs = require("hbs");
const path = require("path");

const app = express();

const dbURI = "mongodb://localhost/taskmanager";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to " + dbURI);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));
app.use("/tasksList", require("./routes/tasksList"));

app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

module.exports = app;
