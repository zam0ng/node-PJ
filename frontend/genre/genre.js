// // all.onclick = async () => {

// //     // window.location.href="http://127.0.0.1:5500/frontend/genre/all.html"

// //     viewList.innerHTML = "";
// //     const { data } = await axios.get("http://127.0.0.1:8080/allview/all");

// //     console.log(data);

// //     cnt.innerText = data.length;

// //     const toggle = document.querySelector(".toggle");

// //     toggle.classList.toggle("active");

// //     data.forEach((el, index) => {
// //         console.log(el.img);
// //         console.log(el.id);
// //         viewList.innerHTML += `<div class="viewCard">
// //           <img src="../../backend/${el.img}" alt="" />
// //           <div class="cardText">
// //             <span>☻</span>
// //             <span>${el.viewcnt}</span>
// //             <span>${el.title}</span>
// //           </div>
// //         </div>`;

// //     });

// // }
// conan.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/conan");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }

// horror.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/horror");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }

// fantasy.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/fantasy");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }

// sorim.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/sorim");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }

// game.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/game");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }

// romance.onclick = async() =>{
//     viewList.innerHTML = "";
//     const {data} = await axios.get("http://127.0.0.1:8080/allview/romance");

//     console.log(data);

//     cnt.innerText = data.length;

//     const toggle = document.querySelector(".toggle");

//     toggle.classList.toggle("active");

//     data.forEach((el,index) => {
//       console.log(el.img);
//       console.log(el.id);
//       viewList.innerHTML += `<div class="viewCard">
//           <img src="../../backend/${el.img}" alt="" />
//           <div class="cardText">
//             <span>☻</span>
//             <span>${el.viewcnt}</span>
//             <span>${el.title}</span>
//           </div>
//         </div>`;

//     });

// }
async function logincheck() {
  const at = document.cookie.slice(8);
  console.log(at);

  const { data } = await axios.get("http://127.0.0.1:8080/main/logincheck", {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,

    //  : {token : at, jojojojojojoj : "kjiljlkjlkjkl"},
  });

  // console.log(data);

  const { nickname, role } = data;
  // console.log(nickname);
  let who;
  // console.log(role);

  if (role == "writer") {
    who = "작가";
  } else {
    who = "독자";
  }

  // console.log(who);

  if (data == "다시 로그인") {
    login.style.display = "block";
    signUp.style.display = "block";
    nick.style.display = "none";
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
  await axios.get("http://127.0.0.1:8080/logout", {
    withCredentials: true,
  });

  document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  location.reload();
};
const allview = document.getElementById("allview");

allview.onclick = async () => {
  console.log("ㅋ");
  const toggle = document.querySelector(".toggle");

  toggle.classList.toggle("active");
};

nick.onclick = async () => {
  const { data } = await axios.get("http://127.0.0.1:8080/main/logincheck", {
    // 이게 rawheader에 쿠키를 저장하는 역할
    withCredentials: true,
  });
  const { nickname, role } = data;

  console.log(role);
  if (role == "writer") {
    window.location.href = "http://127.0.0.1:5500/frontend/writerpage.html";
  }

  if (role == "reader") {
    window.location.href = "http://127.0.0.1:5500/frontend/mypage.html";
  }
};
