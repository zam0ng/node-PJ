btn.onclick = async () => {
  if (!user_id_input.value) {
    pwderr.innerHTML = "";
    undefinedID.innerText = "Please enter your ID";
    undefinedID.style.color = "red";
    return;
  }
  if (!user_pw_input.value) {
    undefinedID.innerHTML = "";
    pwderr.innerText = "Please enter your password";
    pwderr.style.color = "red";
    return;
  }
  const e = await axios.get(`${backend}/login`, {
    withCredentials: true,

    params: {
      user_id: user_id_input.value,
      user_pw: user_pw_input.value,
    },
  });

  console.log("login.html");
  console.log(e);
  if (e.data?.msg == "로그인 성공") {
    console.log(e.data.token);

    window.location.href = `${frontend}index.html`;
  } else if (e.data == "어드민") {
    window.location.href = `${frontend}admin.html`;
  } else if (e.data == "비밀번호 틀림") {
    undefinedID.innerText = "";
    pwderr.innerHTML = "wrong password";
    pwderr.style.color = "red";
  } else if (e.data == "존재하지 않는 계정") {
    pwderr.innerHTML = "";
    undefinedID.innerText = "account does not exist";
    undefinedID.style.color = "red";
  } else if (e.data == "승인되지 않은 계정") {
    pwderr.innerHTML = "";
    undefinedID.innerText = "";
    alert("승인되지 않은 계정입니다.");
  } else if (e.data == "승인거절") {
    pwderr.innerHTML = "";
    undefinedID.innerText = "";
    alert("승인이 거절된 아이디입니다.");
  }
};

function onEnterLogin(event) {
  const keycode = event.key;
  console.log(keycode);
  if (keycode == "Enter") {
    axios
      .post(`${backend}/login`, {
        withCredentials: true,

        params: {
          user_id: user_id_input.value,
          user_pw: user_pw_input.value,
        },
      })
      .then((e) => {
        console.log(e);
        if (e.data == "로그인 성공") {
          window.location.href = `${frontend}index.html`;
        } else if (e.data == "어드민") {
          window.location.href = `${frontend}admin.html`;
        } else if (e.data == "비밀번호 틀림") {
          undefinedID.innerText = "";
          pwderr.innerHTML = "wrong password";
          pwderr.style.color = "red";
        } else if (e.data == "존재하지 않는 계정") {
          pwderr.innerHTML = "";
          undefinedID.innerText = "account does not exist";
          undefinedID.style.color = "red";
        } else if (e.data == "승인되지 않은 계정") {
          pwderr.innerHTML = "";
          undefinedID.innerText = "";
          alert("승인되지 않은 계정입니다.");
        } else if (e.data == "승인거절") {
          pwderr.innerHTML = "";
          undefinedID.innerText = "";
          alert("승인이 거절된 아이디입니다.");
        }
      });
  }
}
