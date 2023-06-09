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

    const { data } = await axios.get("http://127.0.0.1:8080/main/logincheck");

    console.log(data);

    const { nickname, role } = data;
    console.log(nickname);
    let who;
    console.log(role);

    if (role == "writer") {
        who = "작가";
    }
    else {
        who = "독자";
    }

    console.log(who);

    if (data == "다시 로그인") {

        login.style.display = "block";
        signUp.style.display = "block";
        nick.style.display = "none";
    }
    else {
        login.style.display = "none";
        signUp.style.display = "none";
        nick.innerText = "👤" + nickname + " " + who + " 님";

    }
}
logincheck();

logout.onclick = async () => {
    document.cookie = 'mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';

    await axios.get("http://127.0.0.1:8080/logout");

}
const allview = document.getElementById("allview");

allview.onclick = async () => {
    console.log("ㅋ")
    const toggle = document.querySelector(".toggle");

    toggle.classList.toggle("active");
}

