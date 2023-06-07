const express = require("express");
const session = require("express-session");
const dot = require("dotenv").config();
const path = require("path")
const socketio = require("socket.io");
const { sequelize } = require("./models");
const CreatebooksRouter = require("./routers/books")
const UploadRouter = require("./routers/uploads")
const MypageRouter = require("./routers/mypage")
const cors = require("cors")

const app = express();

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
  })
  .catch((err) => {
    console.error(err);
  });

  app.use(cors({
    origin : "http://127.0.0.1:5500",
    credentials : true,
    
  }))
app.use(express.urlencoded({ extended: false }));
app.use("/css",express.static(path.join(__dirname,"frontend/css")));
app.use("/upload",express.static(path.join(__dirname,"upload")))

app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/",(req,res)=>{
  res.send("응답함")
})

app.use(express.json())
app.use("/books",CreatebooksRouter);
app.use("/uploads",UploadRouter)
app.use("/mypages",MypageRouter)


const server = app.listen(8080, () => {
  console.log("Server On!");
});

 