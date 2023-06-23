btn.onclick = (event) => {
  let gender = document.getElementsByName("check-gender");
  let role = document.getElementsByName("check-role");

  gender.forEach((el) => {
    if (el.checked) {
      gender = el.value;
    }
  });
  role.forEach((el) => {
    if (el.checked) {
      role = el.value;
    }
  });
  console.log(role);
  console.log(gender);
  axios
    .post("http://127.0.0.1:8080/signup", {
      withCredentials: true,

      data: {
        user_id: user_id_input.value,
        user_pw: user_pw_input.value,
        user_re_pw: user_re_pw_input.value,
        user_gender: gender,
        user_role: role,
        user_age: age.value,
        user_nick: user_nick_input.value,
        email: email_input.value,
      },
    })
    .then((e) => {
      console.log(e);

      if (e.data == "이미 존재하는 계정") {
        return (window.location.href = 'http://127.0.0.1:5500/frontend/singupErr2.html');
      }

      if (e.data == "비밀번호 불일치") {
        return (window.location.href = 'http://127.0.0.1:5500/frontend/singupErr.html');
      }

      if (e.data == "가입성공") {
        return (window.location.href = "http://127.0.0.1:5500/frontend/login.html");
      }
    });
};
