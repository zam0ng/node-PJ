// let backend = "http://13.209.64.80" ;
// let frontend = "/" ;


  // ==========================================================
  // 채팅 div 그리기
  // ==========================================================
  // 스마일 그리기
  const chatWrap = document.createElement("div");
  const chatImg = document.createElement("img");
  // const socketio = require("socket.io");

  chatWrap.setAttribute("id", "chatWrap");
  chatImg.setAttribute("src", `${backend}/img/happy_yellow.png`);

  chatWrap.append(chatImg);
  document.body.appendChild(chatWrap);

  // 채팅창 그리기
  const chatContainer = document.createElement("div");
  chatContainer.setAttribute("id", "chatContainer");
  const chatMain = document.createElement("div");
  chatMain.setAttribute("id", "chatMain");
  const chatHeader = document.createElement("div");
  chatHeader.setAttribute("class", "chatHeader");
  const chatHeaderImg = document.createElement("img");
  chatHeaderImg.setAttribute(
    "src",
    "https://cdn.discordapp.com/attachments/1114103044242677824/1115109195730132992/Color_logo_-_no_background.png"
  );
  const chatHeaderSpan = document.createElement("span");
  chatHeaderSpan.setAttribute("class", "close-btn");
  const textBox = document.createElement("div");
  textBox.setAttribute("class", "text-box");
  const chatArea = document.createElement("div");
  chatArea.setAttribute("class", "chatArea");
  const sendId = document.createElement("div");
  sendId.setAttribute("id", "send");
  const sendInput = document.createElement("input");
  sendInput.setAttribute("id", "msg");
  sendInput.setAttribute("placeholder", "Please enter your message");
  const sendBtn = document.createElement("button");
  sendBtn.setAttribute("class", "btn-style");
  sendBtn.setAttribute("id", "sendBtn");
  sendBtn.innerHTML = "send";

  chatHeader.append(chatHeaderImg);
  chatHeader.append(chatHeaderSpan);

  textBox.append(chatArea);

  sendId.append(sendInput);
  sendId.append(sendBtn);

  chatMain.append(chatHeader);
  chatMain.append(textBox);
  chatMain.append(sendId);

  chatContainer.append(chatMain);
  document.body.appendChild(chatContainer);
  let socket;
  // ==========================================================

  // ==========================================================
  // 버튼을 누르면 소켓에 연결되면서 로그인한 유저정보를 가져옴
  chatWrap.onclick = async (e) => {
    try {
      // ==========================================
      chatArea.innerHTML = "";
      // ==========================================
      const data = await axios.get(`${backend}/chat/getLoginUser`, {
        // 이게 rawheader에 쿠키를 저장하는 역할
        withCredentials: true,
      });
      console.log(data);
      chatWrap.style.display = "none";
      if(data.data){
        alert("로그인 후 이용해주세요");
        window.location.href = `${frontend}login.html`
        return;
      }

      let chat_id = data.data.id;
      // let user_name = data.data.nickname;
      let user_name = data.data.user_id; 

      // 대화내용 가져오기
      const chatdata = await axios.get(`${backend}/chat/getChatData`, {
        withCredentials: true,
        params: {
          id: chat_id,
        },
      });

      // 데이터베이스에서 사용자와 운영자가 나눈 대화를 가져옴
      chatdata.data.forEach((el, index) => {
        sendMsg(el.chat_id, el.user_name, el.text);
      });

      // 대화한 내용이 창을 벗어나 스크롤이 생기면 맨 아래 부터 보게 하기
      setTimeout(() => {
        chatArea.scrollTop = chatArea.scrollHeight;
      }, 0);

      // 소켓 관련 작업 내용 정리 공간  ==========================
      socket = io.connect(`${backend}`);
      socket.emit("joinRoom", chat_id);
      // 소켓 관련 작업 내용 정리 공간 끝 =========================

      // console.log("이거 chatbtn");
      if ((chatMain.style.display = "none")) {
        chatMain.style.display = "block";
      }

      // 메세지 보내기===============================
      function sendMsg(chat_id, user_name, msg) {
        const textBoxSpan = document.createElement("span");
        if (user_name == "testadmin") {
          textBoxSpan.classList = "adminSpan";
        } else {
          textBoxSpan.classList = "userSpan";
        }
        textBoxSpan.textContent += msg;
        chatArea.appendChild(textBoxSpan);
        chatArea.scrollTop = chatArea.scrollHeight;
      }
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
  chatHeaderSpan.onclick = () => {
    chatMain.style.display = "none";
    chatWrap.style.display = "block";
    socket.off("message");
  };
