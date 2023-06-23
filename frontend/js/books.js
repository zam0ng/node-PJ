logout.onclick = async () => {
  await axios.get(`http://127.0.0.1:8080/logout`, {
    withCredentials: true,
  });

  document.cookie = "mytoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
  window.location.href = `http://127.0.0.1:5500/frontend/index.html`;
};

uploadBtn.onclick = () => {
  const form = new FormData();
  form.append("upload", file.files[0]);
  if (file.files.length == 0) {
    alert("책 표지를 넣어주세요");
  }
  form.append("title", title.value);
  if (!title.value) {
    alert("제목을 입력해주세요");
  }
  form.append("content", content.value);
  if (!content.value) {
    alert("내용를 입력해주세요");
  }
  form.append("genre", genre.options[genre.selectedIndex].value);
  form.append("page", page.value);
  form.append("price", price.value);
  form.append("publish", publish.value);
  axios
    .post(`http://127.0.0.1:8080/books`, form, {
      withCredentials: true,
      "Content-Type": "multipart/form-data",
    })
    .then((e) => {
      if (e.data == "여기 완!") {
        window.location.href = `http://127.0.0.1:5500/frontend/index.html`;
      }
    })
    .catch((err) => {});
  if (file.files.length == 0) {
    alert("책 표지를 넣어주세요");
  }
};
function loadImg(event) {
  let input = event.target;
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      document.getElementById("img1").src = e.target.result;
    };

    reader.readAsDataURL(input.files[0]);
  }
}
