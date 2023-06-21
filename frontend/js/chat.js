// ==========================================================
// 채팅 div 그리기
// ==========================================================
const chatWrap = document.createElement("div");
const chatImg = document.createElement("img");
// const socketio = require("socket.io");

chatWrap.setAttribute("id", "chatWrap");
chatImg.setAttribute("src", "/backend/img/happy_yellow.png");

chatWrap.append(chatImg);
document.body.appendChild(chatWrap);
const closeBtn = document.querySelector(".close-btn");
const chatMain = document.querySelector("#chatMain");
// ==========================================================

// ==========================================================
chatWrap.onclick = (e) => {
  try {
    console.log("이거 chatbtn");
    if ((chatMain.style.display = "none")) {
      chatMain.style.display = "block";
    }
    // console.log(e.target);
  } catch (error) {
    console.error(error);
  }
};
closeBtn.addEventListener("click", function () {
  console.log("close 버튼 눌림?");
  chatMain.style.display = "none";
});

// 메세지 보내기===============================
let userid = "test1";

function sendMsg() {
  if (msg.value !== "") {
    let listItem = document.createElement("li");
    listItem.textContent = msg.value;
    let textList = document.getElementById("textlist");
    textList.appendChild(listItem);
    msg.value = "";
  }
}
let sendButton = document.getElementById("sendBtn");
let msg = document.getElementById("msg")
console.log("메세지 보내기 버튼 눌림?");
sendButton.addEventListener("click", sendMsg);


// enter를 누르면 메세지가 올라가짐
msg.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let inputText = msg.value.trim();
    if (inputText !== "") {
      let listItem = document.createElement("li");
      listItem.textContent = inputText;
      let textList = document.getElementById("textlist");
      textList.appendChild(listItem);
      msg.value = "";
    }
  }
});


//=================================================

window.onload = () => {
  const socket = io.connect("http://localhost:8080");
  socket.emit("joinRoom", userid);
  // sendButton.onclick = () => {
  //   console.log(message.value)
  // socket.emit("message",userid,msg.value)
  // msg.value=""
  // console.log(msg.value)
  // }
};
