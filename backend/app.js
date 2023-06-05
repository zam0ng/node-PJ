const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const socketio = require("socket.io");
const { sequelize } = require("./models");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
  })
);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
  })
  .catch((err) => {
    console.error(err);
  });

const server = app.listen(8080, () => {
  console.log("Server On");
});

const io = socketio(server);
