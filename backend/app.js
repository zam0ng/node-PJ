const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const dot = require("dotenv").config();
const socketio = require("socket.io");
const { sequelize } = require("./models");

const mainRouter = require("./routers/mainRouter");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "test",
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/css", express.static(path.join(__dirname, "frontend/css")));
app.use("/img", express.static(path.join(__dirname, "frontend/img")));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
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

app.use("/main", mainRouter);

const server = app.listen(8080, () => {
  console.log("Server On");
});

const io = socketio(server);
