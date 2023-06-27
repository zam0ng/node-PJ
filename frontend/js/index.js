if (document.addEventListener) {
  window.addEventListener(
    "pageshow",
    function (event) {
      //console.log(event.persisted);
      //console.log(window.performance);
      //console.log(window.performance.navigation.type);
      if (
        event.persisted ||
        (window.performance && window.performance.navigation.type == 2)
      ) {
        // //console.log("hi");
        location.reload();
      }
    },
    true
  );
}
// 조회수가 가장 많은 5개의 리스트를 가져옴
async function getViewList() {
  const { data } = await axios.get(`${backend}/main/viewlist`);
  //console.log(data);
  data.forEach((el, index) => {
    viewList.innerHTML += `<a href="${frontend}view.html?id=${el.id}"><div class="viewCard">
            <img src="${backend}/${el.img}" alt="" />
            <div class="cardText">
              <span>👁️‍🗨️</span>
              <span>${el.viewcnt}</span>
              <span>${el.title}</span>
            </div>
          </div></a>`;
  });
}

// 별점이 높은 순으로 5개의 리스트를 가져옴
async function getStarList() {
  const { data } = await axios.get(`${backend}/main/starlist`);
  //console.log(data);
  data.forEach((el, index) => {
    starList.innerHTML += `<a href="${frontend}view.html?id=${el.id}"><div class="viewCard">
            <img src="${backend}/${el.img}" alt="" />
            <div class="cardText">
              <span>⭐</span>
              <span>${el.orderstar}</span>
              <span>${el.title}</span>
            </div>
          </div></a>`;
  });
  isLoading.classList.add("disable");
}
getStarList();
getViewList();

async function logincheck() {
  // const at = document.cookie.slice(8);
  // //console.log(at);

  const data = await axios.get(`${backend}/main/logincheck`, {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,

    //  : {token : at, jojojojojojoj : "kjiljlkjlkjkl"},
  });

  //console.log(data);

  const { nickname, role } = data.data;
  //console.log(nickname);
  let who;
  //console.log(role);

  if (role == "writer") {
    who = "작가";
  }
  if(role == "reader"){
    who = "독자";
  }
  if(role == "testadmin"){
    who = "관리자";
  }

  //console.log(who);

  if (data.data == "relogin") {
    login.style.display = "block";
    signUp.style.display = "block";
    nick.style.display = "none";
    logout.style.visibility = "hidden";
  } else {
    login.style.display = "none";
    signUp.style.display = "none";
    nick.innerText = "👤" + nickname + " " + who + " 님";
    logout.style.visibility = "visible";

    if (who == "작가") {
      insert.style.visibility = "visible";
    }
  }
}
nick.onclick = async () => {
  const { data } = await axios.get(`${backend}/main/logincheck`, {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,
  });
  const { nickname, role } = data;

  //console.log(role);
  if (role == "writer") {
    window.location.href = `${frontend}writerpage.html`;
  }

  if (role == "reader") {
    window.location.href = `${frontend}mypage.html`;
  }
};
logincheck();

logout.onclick = async () => {
  await axios.get(`${backend}/logout`, {
    withCredentials: true,
  });

  document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  location.reload();
};

allview.onclick = async () => {
  const toggle = document.querySelector(".toggle");

  toggle.classList.toggle("active");
};

// a 태그 링크 정리
const logoBox = document.querySelector(".logoBox");

//console.log(logoBox);
