window.onload = async () => {

  tab_title.innerText = "가입 승인";
  user_agree.style.color = "black";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "rgb(158, 158, 158)";
  reject_reason.style.visibility = "hidden";
  main_content3.style.display = "none";
  main_content2.style.display = "none";

  const data = await axios.get(`${backend}/nonagreeuser`, {
    withCredentials: true,
  });
  main_content.innerHTML = "";

  if (data.data.length == 0) {
    isLoading.classList.add("disable");
    return main_content.innerHTML = `가입 승인 대기중인 유저가 없습니다.`;

  }

  main_content.innerHTML = `
                    <br>
                    <table class="tb">
                        <th class="num">num</th>
                        <th class="user_id">user_id</th>
                        <th class="gender">M/W</th>
                        <th class="role">W/R</th>
                        <th class="age">age</th>
                        <th class="nickname">nickname</th>
                    </table>`;

  data.data.forEach((el, index) => {
    main_content.innerHTML += `       <div style="display:flex">
                    <table class="tb">
                        
                        <td class="num">${el.id}</td>
                        <td class="user_id">${el.user_id}</td>
                        <td class="gender">${el.gender}</td>
                        <td class="role">${el.role}</td>
                        <td class="age">${el.age}</td>
                        <td class="nickname">${el.nickname}</td>
                        
                        
                    </table>
                        <button class="accept">  </button>
                        <button class="reject">  </button>
                </div>
        `;

    const accept = document.querySelectorAll(".accept");
    const reject = document.querySelectorAll(".reject");

    accept.forEach((e, index) => {
      e.onclick = async () => {
        const data = await axios.get(`${backend}/nonagreeuser`, {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          if (index == indexx) {
            e.grade = e.grade + 1;
            axios.post(`${backend}/nonagreeuser`, {
              withCredentials: true,

              data: {
                grade: e.grade,
                user_id: e.user_id,
              },
            });
          }
        });
        location.reload();
      };
    });

    reject.forEach((e, index) => {
      e.onclick = async () => {
        const data = await axios.get(`${backend}/nonagreeuser`, {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          if (index == indexx) {
            e.grade = e.grade - 1;
            axios.post(`${backend}/nonagreeuser`, {
              withCredentials: true,

              data: {
                grade: e.grade,
                user_id: e.user_id,
              },
            });
          }
        });


        
        location.reload();
      };
    });
  });
  async function admincheck() {
    // const at = document.cookie.slice(8);
    // console.log(at);
  
    const data = await axios.get(`${backend}/main/admincheck`, {
      // 이게 rawheader에 쿠키를 저장하는 역할
      withCredentials: true,
  
      //  : {token : at, jojojojojojoj : "kjiljlkjlkjkl"},
    });

    if(data.data=="undi"){
      alert("어드민 계정으로 로그인하세요");
      window.location.href = `${frontend}login.html`;
    }
    else if(data.data=="admin"){
      isLoading.classList.add("disable");
    }

  }
  admincheck();
  // isLoading.classList.add("disable");
};
user_agree.onclick = async () => {
  tab_title.innerText = "가입 승인";
  user_agree.style.color = "black";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "rgb(158, 158, 158)";

  // main_content2.style.visibility = "hidden";
  main_content2.style.display="none";
  reject_reason.style.visibility = "hidden";
  main_content.style.display = "block";
  main_content3.style.display = "none";

  const data = await axios.get(`${backend}/nonagreeuser`, {
    withCredentials: true,
  });
  main_content.innerHTML = "";

  if (data.data.length == 0) {
    main_content.style.display = "block";
    return (main_content.innerHTML = `가입 승인 대기중인 유저가 없습니다.`);
  }

  main_content.innerHTML = `
                    <br>
                    <table class="tb">
                        <th class="num">num</th>
                        <th class="user_id">user_id</th>
                        <th class="gender">M/W</th>
                        <th class="role">W/R</th>
                        <th class="age">age</th>
                        <th class="nickname">nickname</th>
                    </table>`;

  data.data.forEach((el, index) => {
    main_content.innerHTML += `       <div style="display:flex">
                    <table class="tb">
                        
                        <td class="num">${el.id}</td>
                        <td class="user_id">${el.user_id}</td>
                        <td class="gender">${el.gender}</td>
                        <td class="role">${el.role}</td>
                        <td class="age">${el.age}</td>
                        <td class="nickname">${el.nickname}</td>
                        
                        
                    </table>
                        <button class="accept">  </button>
                        <button class="reject">  </button>
                </div>
        `;

    const accept = document.querySelectorAll(".accept");

    accept.forEach((e, index) => {
      e.onclick = async () => {
        const data = await axios.get(`${backend}/nonagreeuser`, {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          if (index == indexx) {
            e.grade = e.grade + 1;
            axios.post(`${backend}/nonagreeuser`, {
              withCredentials: true,

              data: {
                grade: e.grade,
                user_id: e.user_id,
              },
            });
          }
        });
      };
    });
  });
};
closee.onclick = () => {
  reject_reason.style.visibility = "hidden";
};

// 게시글 관리
post_agree.onclick = async () => {
  main_content2.innerHTML = "";
  // main_content2.style.visibility = "visible";
  main_content2.style.display = "flex";

  main_content.style.display = "none";
  //0619
  main_content3.style.visibility = "hidden";

  tab_title.innerText = "게시글 관리";
  user_agree.style.color = "rgb(158, 158, 158)";
  post_agree.style.color = "black";
  chat_agree.style.color = "rgb(158, 158, 158)";
  const data = await axios.get(`${backend}/nonagreeuser/posts`, {
    withCredentials: true,
  });

  if (data.data.length == 0) {
    main_content2.style.visibility = "visible";
    return (main_content2.innerHTML = `승인 대기중인 게시글이 없습니다.`);
  }

  data.data.forEach((el) => {
    main_content2.innerHTML += `
                <div class="book_img">
                <img src="${backend}/${el.img}" alt="">
                <div class="book_title">${el.title}</div>
                        <button class="accept2">  </button>
                        <button class="reject2">  </button>
                </div>
            `;
    const accept2 = document.querySelectorAll(".accept2");
    const reject2 = document.querySelectorAll(".reject2");

    accept2.forEach((e, index) => {
      e.onclick = async () => {
        const data = await axios.get(`${backend}/nonagreeuser/posts`, {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          if (index == indexx) {
            e.accept = parseInt(e.accept) + 1;
            axios.get(`${backend}/nonagreeuser/acceptUpdate`, {
              withCredentials: true,

              params: {
                accept: e.accept,
                id: e.id,
              },
            });
          }
        });
        location.reload();
      };
    });

    reject2.forEach((e, index) => {
      e.onclick = async () => {
        reject_reason.style.visibility = "visible";

        rejectbtn.onclick = async () => {
          // reject_reason.style.display = "block";

          const reasonvalue = reason.options[reason.selectedIndex].value;

          const data = await axios.get(`${backend}/nonagreeuser/posts`, {
            withCredentials: true,
          });

          data.data.forEach((e, indexx) => {
            if (index == indexx) {
              e.accept = parseInt(e.accept) - 1;
              axios.get(`${backend}/nonagreeuser/acceptUpdate`, {
                withCredentials: true,

                params: {
                  accept: e.accept,
                  id: e.id,
                  reject: reasonvalue,
                },
              });
            }
          });
          reject_reason.style.visibility = "hidden";
          location.reload();
        };
      };
    });
  });
};

//    rejectbtn.onclick = () =>{
//         const reasonvalue = reason.options[reason.selectedIndex].value;

//         axios.get("http://127.0.0.1:8080/nonagreeuser/rejectUpdate",{

//             withCredentials: true,

//             params : {
//                 reject : reasonvalue,
//             }
//         })
//    }

chat_agree.onclick = async () => {
  let chatUserId = document.querySelector(".chat_user_id");
  tab_title.innerText = "고객 문의";
  user_agree.style.color = "rgb(158, 158, 158)";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "black";

  //0619
  chatUserId.innerHTML = "";
  main_content3.style.display = "block";
  main_content3.style.visibility = "visible";
  // main_content2.style.visibility = "hidden";
  main_content2.style.display = "none";
  main_content.style.display = "none";

  let chatArea = document.querySelector(".chatArea");

  // confirm 이 0인 값을 가져와보자.
  const confirmZero = await axios.get(`${backend}/chat/confirmZero`, {
    withCredentials: true,
  });

  // 채팅을 한번이라도 한 유저 이름 가져와야함
  const un = await axios.get(`${backend}/chat/username`, {
    withCredentials: true,
  });

  const socket = io.connect(`${backend}`);
  let chat_id;
  const userName = "testadmin";
  let userTemp;
  let chatUserInfo;
  console.log(confirmZero);
  confirmZero.data.forEach((el, index) => {
    // const { user_name } = el;
    console.log(el);
    // console.log(zeroCnt);
    if (el.zeroCnt == 0) {
      chatUserId.innerHTML += `
             <li class="userClick"><span class="usn">${el.user_name}</span>
            </li>`;
    } else {
      chatUserId.innerHTML += `
             <li class="userClick"><span class="usn">${el.user_name}</span><span class="zeroCnt">${el.zeroCnt}</span>
            </li>
                                  
            `;
    }
    //usn : User Span Name
    let userClick = document.querySelectorAll(".userClick");
    let usn = document.querySelectorAll(".usn");
    

    userClick.forEach((el, index) => {
      el.style.backgroundColor = "";
      el.onclick = async (e) => {
      console.log(e)
      const zeroCnt = e.target.querySelector(".zeroCnt");
      console.log(zeroCnt);

        // 메세지가 왔을 때
        if(zeroCnt !=null){
          zeroCnt.style.display = "none";
        }

        chatArea.innerHTML = "";
        if (userTemp) {
          socket.emit("leaveRoom", chat_id);
        }
        // el.style.backgroundColor="red"
        let str = confirmZero.data[index].user_name;

        who_room.innerText = str;

        chatUserInfo = await axios.get(`${backend}/chat/getUserInfo`, {
          withCredentials: true,
          params: {
            user_id: str,
          },
        });
        chat_id = chatUserInfo.data.id;

        socket.emit("joinRoom", chat_id);

        // 소켓 연결됬을때 카톡 읽은것처럼 1로 바꿈.

        if (socket.emit("joinRoom", chat_id).connected) {
          const data = axios.get(`${backend}/chat/changeone`, {
            withCredentials: true,

            params: {
              chat_id: chat_id,
            },
          });
        }
        userTemp = chat_id;

        const chatdata = await axios.get(`${backend}/chat/getChatData`, {
          withCredentials: true,
          params: {
            id: chat_id,
          },
        });

        chatdata.data.forEach((el, index) => {
          if (el.user_name == "testadmin") {
            chatArea.innerHTML += `
    
                                <span class="userSpan">${el.text}</span>
                            `;
          } else {
            chatArea.innerHTML += `
    
                                <span class="adminSpan">${el.text}</span>
                            `;
          }
        });
        // 대화한 내용이 창을 벗어나 스크롤이 생기면 맨 아래 부터 보게 하기
        setTimeout(() => {
          chatArea.scrollTop = chatArea.scrollHeight;
        }, 0);
      };

      
    });
  });

  sendBtn.onclick = () => {
    socket.emit("message", chat_id, userName, adminMsg.value);
    adminMsg.value = "";
  };

  socket.on("message", async(chat_id, user_name, msg) => {

    await axios.get(`${backend}/chat/changeone`, {
      withCredentials: true,

      params: {
        chat_id: chat_id,
      },
    });


    if (user_name == "testadmin") {
      chatArea.innerHTML += `

                <span class="userSpan">${msg}</span>
                `;
    } else {
      chatArea.innerHTML += `

            <span class="adminSpan">${msg}</span>
                `;
    }
    // 대화한 내용이 창을 벗어나 스크롤이 생기면 맨 아래 부터 보게 하기
    chatArea.scrollTop = chatArea.scrollHeight;
  });
};
