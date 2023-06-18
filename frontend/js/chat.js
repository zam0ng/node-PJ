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
  chatWrap.onclick = async (e) => {
    try {
      let chat_id = 2;
      let user_name = "test1";

      const chatdata = await axios.get(
        "http://127.0.0.1:8080/chat/getChatData",
        {
          withCredentials: true,
          params: {
            id: chat_id,
          },
        }
      );

      chatdata.data.forEach((el, index) => {
        sendMsg(el.chat_id, el.user_name, el.text);
      });
      // 소켓 관련 작업 내용 정리 공간  ==========================
      const socket = io.connect("http://localhost:8080");
      socket.emit("joinRoom", chat_id);
      // 소켓 관련 작업 내용 정리 공간 끝 =========================

      // console.log("이거 chatbtn");
      if ((chatMain.style.display = "none")) {
        chatMain.style.display = "block";
      }

      // 메세지 보내기===============================

      function sendMsg(chat_id, user_name, msg) {
        const textBox = document.querySelector(".text-box");
        const textBoxSpan = document.createElement("span");
        if (user_name == "admin") {
          textBoxSpan.classList = "adminSpan";
        } else {
          textBoxSpan.classList = "userSpan";
        }
        textBoxSpan.textContent = user_name + " : " + msg;
        textBox.appendChild(textBoxSpan);
        // let listItem = document.createElement("li");
        // listItem.textContent = user_name + " : " + msg;
        // let textList = document.getElementById("textlist");
        // textList.appendChild(listItem);
      }
      console.log("메세지 보내기 버튼 눌림?");
      sendBtn.onclick = () => {
        // 입력한 메시지를 서버로 보냄
        socket.emit("message", chat_id, user_name, msg.value);
        msg.value = "";
      };
      // 보낸 메시지가 다시 돌아옴
      socket.on("message", (chat_id, user_name, msg) => {
        // console.log("socket.on 'message'");
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
