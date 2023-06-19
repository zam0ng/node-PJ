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
  let socket;
  // ==========================================================

  // ==========================================================
  // 버튼을 누르면 소켓에 연결되면서 로그인한 유저정보를 가져옴
  chatWrap.onclick = async (e) => {
    try {
      const textBox = document.querySelector(".text-box");
      const chatArea = textBox.querySelector(".chatArea");
      chatWrap.style.display = "none";

      let chat_id = 3;
      let user_name = "test2";

      const chatdata = await axios.get(
        "http://127.0.0.1:8080/chat/getChatData",
        {
          withCredentials: true,
          params: {
            id: chat_id,
          },
        }
      );

      // 데이터베이스에서 사용자와 운영자가 나눈 대화를 가져옴
      chatdata.data.forEach((el, index) => {
        sendMsg(el.chat_id, el.user_name, el.text);
      });

      // 대화한 내용이 창을 벗어나 스크롤이 생기면 맨 아래 부터 보게 하기
      setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
      }, 0);

      // 소켓 관련 작업 내용 정리 공간  ==========================
      socket = io.connect("http://localhost:8080");
      socket.emit("joinRoom", chat_id);
      // 소켓 관련 작업 내용 정리 공간 끝 =========================

      // console.log("이거 chatbtn");
      if ((chatMain.style.display = "none")) {
        chatMain.style.display = "block";
      }

      // 메세지 보내기===============================
      function sendMsg(chat_id, user_name, msg) {
        const textBoxSpan = document.createElement("span");
        if (user_name == "admin") {
          textBoxSpan.classList = "adminSpan";
        } else {
          textBoxSpan.classList = "userSpan";
        }
        // textBoxSpan.textContent = user_name + " : " + msg;
        textBoxSpan.textContent += msg;
        chatArea.appendChild(textBoxSpan);
        chatArea.scrollTop = chatArea.scrollHeight;
      }
      // console.log("메세지 보내기 버튼 눌림?");
      sendBtn.onclick = () => {
        // 입력한 메시지를 서버로 보냄
        socket.emit("message", chat_id, user_name, msg.value);
        msg.value = "";
      };

      // 보낸 메시지가 다시 돌아옴
      socket.on("message", (chat_id, user_name, msg) => {
        sendMsg(chat_id, user_name, msg);
      });
    } catch (error) {
      console.error(error);
    }
  };

  // ==========================================================
  // 활성화된 채팅 창에서 x를 눌러 스마일표시로 되돌아감
  // closeBtn.addEventListener("click", function () {
  closeBtn.onclick = () => {
    // console.log("close 버튼 눌림?");
    chatMain.style.display = "none";
    chatWrap.style.display = "block";
    socket.off("message");
  };
};
