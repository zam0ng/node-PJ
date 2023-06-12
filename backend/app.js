const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const dot = require("dotenv").config();
const socketio = require("socket.io");
const { sequelize ,User } = require("./models");
const {adminsignup} = require("./controllers/admin");


const mainRouter = require("./routers/mainRouter");

const app = express();

const signuprouter = require("./routers/signup");
const loginrouter = require("./routers/login");
const nonagreeuser = require("./routers/nonagreeuser");
const logoutrouter = require("./routers/logout");
const allview = require("./routers/allview");

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

app.use("/css", express.static(path.join(__dirname, "frontend/css")));
app.use("/img", express.static(path.join(__dirname, "frontend/img")));

app.use(express.json());

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
    adminsignup(User);  
  })
  .catch((err) => {
    console.error(err);
  });


app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true,
}))

//
app.use(session({
  name : "mytoken",
  secret : process.env.SESSION_KEY,
  resave : false,
  saveUninitialized : false,
  // cookie :{secure : false},

}))

app.use('/signup',signuprouter);
app.use('/login',loginrouter);
app.use("/main", mainRouter);
app.use("/nonagreeuser", nonagreeuser);
app.use("/logout",logoutrouter);
app.use("/allview",allview);

const server = app.listen(8080, () => {
  console.log("Server On");
});

const io = socketio(server);
