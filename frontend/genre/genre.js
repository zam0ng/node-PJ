const backend = "http://najakjak.store";
const frontend = "/";

async function logincheck() {
  // const at = document.cookie.slice(8);
  // console.log(at);

  const data = await axios.get(`${backend}/main/logincheck`, {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,
  });

  const { nickname, role } = data.data;
  let who;

  if (role == "writer") {
    who = "작가";
  }
  if (role == "reader") {
    who = "독자";
  }
  if (role == "testadmin") {
    who = "관리자";
  }

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
logincheck();

logout.onclick = async () => {
  await axios.get(`${backend}/logout`, {
    withCredentials: true,
  });

  document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  location.reload();
};
const allview = document.getElementById("allview");

allview.onclick = async () => {
  const toggle = document.querySelector(".toggle");

  toggle.classList.toggle("active");
};

nick.onclick = async () => {
  const { data } = await axios.get(`${backend}/main/logincheck`, {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,
  });
  const { nickname, role } = data;

  if (role == "writer") {
    window.location.href = `${frontend}writerpage.html`;
  }

  if (role == "reader") {
    window.location.href = `${frontend}mypage.html`;
  }
};
