async function getView() {
  await axios.get("http://127.0.0.1:8080/view").then((e) => {
    console.log("then");
    console.log(e);
    console.log(e.data.Books.img);
    const data = e.data;
    const Books = data.Books[0];
    if (e.status == 200) {
      // 사이드바 책 표지 출력
      const sideWrapImg = document.querySelector(".sideWrapImg");
      sideWrapImg.setAttribute("src", `../../backend/${Books.img}`);

      // 책 타이틀, 지은이 출력
      const viewMainWrap = document.querySelector(".viewMainWrap");
      const viewMainTextH1 = viewMainWrap.querySelector("h1");
      const viewMainTextSpan = viewMainWrap.querySelector("span");
      viewMainTextH1.innerHTML = `${e.data.title}`;
      viewMainTextSpan.innerHTML = `${e.data.writer}`;

      // 책 줄거리 출력
      const textContainer = document.querySelector(".textContainer");
      textContainer.innerHTML = `${e.data.content}`;

      // 장르 출력
      const genre = document.querySelector(".genre");
      const genreSpan = genre.querySelectorAll("span");
      genreSpan[1].innerHTML = `${e.data.genre}`;

      // 페이지 수 출력
      const bookpage = document.querySelector(".bookpage");
      const bookpageSpan = bookpage.querySelectorAll("span");
      bookpageSpan[0].innerHTML = `${e.data.page}`;

      // 출판일 출력
      const bookpublish = document.querySelector(".bookpublish");
      const bookpublishSpan = bookpublish.querySelectorAll("span");

      const publishDate = e.data.createdAt.split("-");
      if (publishDate[1] == "01") publishDate[1] = "Jan";
      if (publishDate[1] == "02") publishDate[1] = "Feb";
      if (publishDate[1] == "03") publishDate[1] = "Mar";
      if (publishDate[1] == "04") publishDate[1] = "Apr";
      if (publishDate[1] == "05") publishDate[1] = "May";
      if (publishDate[1] == "06") publishDate[1] = "Jun";
      if (publishDate[1] == "07") publishDate[1] = "Jul";
      if (publishDate[1] == "08") publishDate[1] = "Aug";
      if (publishDate[1] == "09") publishDate[1] = "Sep";
      if (publishDate[1] == "10") publishDate[1] = "Oct";
      if (publishDate[1] == "11") publishDate[1] = "Nov";
      if (publishDate[1] == "12") publishDate[1] = "Dec";

      bookpublishSpan[1].innerHTML =
        publishDate[1] +
        " " +
        publishDate[2].substr(0, 2) +
        " " +
        publishDate[0];

      // 작가 이미지
      const authorImg = document.querySelector(".authorImg");
      const authorImgImg = authorImg.querySelector("img");
    }
  });
}

getView();
