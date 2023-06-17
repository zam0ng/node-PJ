window.onload = () => {
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
  // 버튼을 누르면 소켓에 연결되면서 로그인한 유저정보를 가져옴
  chatWrap.onclick = (e) => {
    try {
      let chat_id = "3";
      let user_name = "test2";
      // 소켓 관련 작업 내용 정리 공간  ==========================
      const socket = io.connect("http://localhost:8080");
      socket.emit("joinRoom", user_name);
      // 소켓 관련 작업 내용 정리 공간 끝 =========================

      // console.log("이거 chatbtn");
      if ((chatMain.style.display = "none")) {
        chatMain.style.display = "block";
      }

      // 메세지 보내기===============================

      function sendMsg(chat_id, user_name, msg) {
        // if (msg) {
        let listItem = document.createElement("li");
        listItem.textContent = user_name + " : " + msg;
        let textList = document.getElementById("textlist");
        textList.appendChild(listItem);
        console.log("sendMsg() done");
        console.log(listItem);
        // }
      }
      console.log("메세지 보내기 버튼 눌림?");
      sendBtn.onclick = () => {
        // 입력한 메시지를 서버로 보냄
        socket.emit("message", chat_id, user_name, msg.value);
        msg.value = "";
      };
      // 보낸 메시지가 다시 돌아옴
      socket.on("message", (chat_id, user_name, msg) => {
        console.log("socket.on 'message'");
        sendMsg(chat_id, user_name, msg);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================================
  // 활성화된 채팅 창에서 x를 눌러 스마일표시로 되돌아감
  closeBtn.addEventListener("click", function () {
    console.log("close 버튼 눌림?");
    chatMain.style.display = "none";
  });
};
