// ==========================================================
// 채팅 div 그리기
// ==========================================================
const chatWrap = document.createElement("div");
const chatImg = document.createElement("img");

chatWrap.setAttribute("id", "chatWrap");
chatImg.setAttribute("src", "/backend/img/happy_yellow.png");

chatWrap.append(chatImg);

document.body.appendChild(chatWrap);
// ==========================================================

// ==========================================================
chatWrap.onclick = (e) => {
  try {
    console.log(e.target);
  } catch (error) {
    console.error(error);
  }
};
