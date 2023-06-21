const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dot = require("dotenv").config();
const path = require("path");
const socketio = require("socket.io");
const axios = require("axios");


const { sequelize, User } = require("./models");
const { adminsignup } = require("./controllers/admin");

const app = express();

// 라우터 require
const CreatebooksRouter = require("./routers/books");
const UploadRouter = require("./routers/uploads");
const MypageRouter = require("./routers/mypage");
const WriterResult = require("./routers/writer");
const signuprouter = require("./routers/signup");
const loginrouter = require("./routers/login");
const nonagreeuser = require("./routers/nonagreeuser");
const logoutrouter = require("./routers/logout");
const allview = require("./routers/allview");
const mainRouter = require("./routers/mainRouter");
const bodyParser = require("body-parser");
const viewRouter = require("./routers/viewRouter");
const checkRouter = require("./routers/checklist"); 
const chatRouter = require("./routers/chatRouter");


app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("database Connect");
    adminsignup(User);
  })
  .catch((err) => {
    console.error(err);
  });

app.use(express.urlencoded({ extended: false }));

app.use("/img", express.static(path.join(__dirname, "img")));
app.use("/css", express.static(path.join(__dirname, "frontend/css")));
app.use("/upload", express.static(path.join(__dirname, "upload")));
app.use(express.static("../frontend"));

app.get("/", (req, res) => {
  // res.redirect("http://127.0.0.1:5500/index.html");
  res.send("응답합")
});

app.use(
  cors({
    origin: "${process.env.backend}",
    credentials: true,
  })
);

//
app.use(
  session({
    name: "mytoken",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    // cookie :{secure : false},
  })
);

app.use(express.json());
app.use("/books", CreatebooksRouter);
app.use("/uploads", UploadRouter);
app.use("/mypages", MypageRouter);
app.use("/writer", WriterResult);
app.use("/signup", signuprouter);
app.use("/login", loginrouter);
app.use("/main", mainRouter);
app.use("/nonagreeuser", nonagreeuser);
app.use("/logout", logoutrouter);
app.use("/allview", allview);
app.use("/view", viewRouter);
app.use("/check",checkRouter);
app.use("/chat", chatRouter);


const server = app.listen(8080, () => {
  console.log("Server On!");
});

const io = socketio(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connect", (socket) => {
  // console.log("socket 시작함");

  socket.on("joinRoom", (chat_id) => {
    // console.log(chat_id, " 입장");
    socket.join(chat_id);
    // console.log(user_name + "님과 채팅을 시작합니다.");
    // io.to(room).emit("joinRoom",room,name)
  });

  socket.on("leaveRoom", (chat_id) => {
    socket.leave(chat_id);
  });

  socket.on("message", (chat_id, user_name, text) => {
    axios.post(
      `${process.env.backend}/chat`,
      {
        chat_id,
        user_name,
        text,
      },
      {
        withCredentials: true,
      }
    );

    io.to(chat_id).emit("message", chat_id, user_name, text);
  });
});
