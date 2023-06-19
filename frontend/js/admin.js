window.onload = async () => {
  tab_title.innerText = "가입 승인";
  user_agree.style.color = "black";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "rgb(158, 158, 158)";
  reject_reason.style.visibility = "hidden";

  const data = await axios.get("http://13.209.64.80/nonagreeuser", {
    withCredentials: true,
  });
  main_content.innerHTML = "";

  console.log(data);

  if (data.data.length == 0) {
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
  // console.log(data);
  // console.log(data.data);

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
        console.log("클릭됨");
        console.log(index);

        const data = await axios.get("http://13.209.64.80/nonagreeuser", {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          // console.log(index,indexx);
          // console.log("Xxxxxxxx")
          // console.log(typeof(e.grade));

          if (index == indexx) {
            e.grade = e.grade + 1;
            // console.log(e.grade);
            console.log(e.user_id);
            axios.post("http://13.209.64.80/nonagreeuser", {
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
        console.log("클릭");

        const data = await axios.get("http://13.209.64.80/nonagreeuser", {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          // console.log(index,indexx);
          // console.log("Xxxxxxxx")
          // console.log(typeof(e.grade));

          if (index == indexx) {
            e.grade = e.grade - 1;
            // console.log(e.grade);
            console.log(e.user_id);
            axios.post("http://13.209.64.80/nonagreeuser", {
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
};
user_agree.onclick = async () => {
  tab_title.innerText = "가입 승인";
  user_agree.style.color = "black";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "rgb(158, 158, 158)";
  main_content2.style.visibility = "hidden";
  reject_reason.style.visibility = "hidden";

  const data = await axios.get("http://13.209.64.80/nonagreeuser", {
    withCredentials: true,
  });
  main_content.innerHTML = "";

  console.log(data);

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
  // console.log(data);
  // console.log(data.data);

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
        console.log("클릭됨");
        console.log(index);

        const data = await axios.get("http://13.209.64.80/nonagreeuser", {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          // console.log(index,indexx);
          // console.log("Xxxxxxxx")
          // console.log(typeof(e.grade));

          if (index == indexx) {
            e.grade = e.grade + 1;
            // console.log(e.grade);
            console.log(e.user_id);
            axios.post("http://13.209.64.80/nonagreeuser", {
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
  main_content2.style.visibility = "visible";
  tab_title.innerText = "게시글 관리";
  user_agree.style.color = "rgb(158, 158, 158)";
  post_agree.style.color = "black";
  chat_agree.style.color = "rgb(158, 158, 158)";
  main_content.style.display = "none";
  console.log("클릭 되냐>?");
  const data = await axios.get("http://13.209.64.80/nonagreeuser/posts", {
    withCredentials: true,
  });

  console.log(data);

  data.data.forEach((el) => {
    console.log(el.img);

    main_content2.innerHTML += `
            <div class="book_img">
            <img src="http://13.209.64.80/${el.img}" alt="">
            <div class="book_title">${el.title}</div>
                    <button class="accept2">  </button>
                    <button class="reject2">  </button>
            </div>
        `;
    const accept2 = document.querySelectorAll(".accept2");
    const reject2 = document.querySelectorAll(".reject2");

    accept2.forEach((e, index) => {
      e.onclick = async () => {
        console.log("클릭됨");
        console.log(index);

        const data = await axios.get("http://13.209.64.80/nonagreeuser/posts", {
          withCredentials: true,
        });

        data.data.forEach((e, indexx) => {
          // console.log(index,indexx);
          // console.log("Xxxxxxxx")
          // console.log(typeof(e.accept));

          if (index == indexx) {
            e.accept = parseInt(e.accept) + 1;
            console.log(e.accept);
            console.log(e.id);
            axios.get("http://13.209.64.80/nonagreeuser/acceptUpdate", {
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
          console.log("클릭");

          const data = await axios.get(
            "http://13.209.64.80/nonagreeuser/posts",
            {
              withCredentials: true,
            }
          );

          data.data.forEach((e, indexx) => {
            console.log(index, indexx);
            console.log("Xxxxxxxx");
            console.log(typeof e.accept);

            if (index == indexx) {
              e.accept = parseInt(e.accept) - 1;
              console.log(e.grade);
              console.log(e.id);
              axios.get("http://13.209.64.80/nonagreeuser/acceptUpdate", {
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

chat_agree.onclick = () => {
  tab_title.innerText = "고객 문의";
  user_agree.style.color = "rgb(158, 158, 158)";
  post_agree.style.color = "rgb(158, 158, 158)";
  chat_agree.style.color = "black";
};
