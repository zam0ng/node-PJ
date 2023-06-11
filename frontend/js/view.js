async function getView() {
  await axios.get("http://127.0.0.1:8080/view").then((e) => {
    console.log("then");
    console.log(e);
    const author = e.data.bookdata;
    const bookInfo = author.Books[0];
    const thisReview = bookInfo.Reviews;
    const userInfo = e.data.userdata;
    const starInfo = e.data.stardata;
    const authordata = e.data.authordata;
    const userAlldata = e.data.userAlldata;
    // 넘어오는 데이터 콘솔 로그
    console.log("작가 정보 : author");
    console.log(author);
    console.log("책 정보 : bookInfo");
    console.log(bookInfo);
    console.log("책에 있는 댓글들 모음 : thisReview");
    console.log(thisReview);
    console.log("로그인한 유저 정보 : userInfo");
    console.log(userInfo);
    console.log("리뷰 점수 : starInfo");
    console.log(starInfo);
    console.log("작가 정보만 가져오기(작성 글 수, 팔로워 수) : authordata");
    console.log(authordata);
    console.log("모든 유저 정보를 가져옴");
    console.log(userAlldata);

    //===============================================
    // 넘어온 데이터 가공 하는 곳
    //===============================================

    // 별점이 비어있는 경우 비어 있는 별점 채우기
    if (starInfo.length != 5) {
      for (let i = 0; i < 5; i++) {
        if (starInfo[i] == undefined) {
          console.log("별점 정보가 없는 별점 숫자 찾기");
          console.log("starInfo", i, "undefined");
          starInfo[i] = { star: `${i}`, starCnt: 0, starSum: 0 };
        }
      }
      starInfo.sort((a, b) => a.star - b.star);
      starInfo.reverse();
    }
    //===============================================

    if (e.status == 200) {
      // index.html의 스타일 시트를 가져옴
      const documentStyleSheet = document.styleSheets[0];

      // 사이드바 책 표지 출력
      const sideWrapImg = document.querySelector(".sideWrapImg");
      sideWrapImg.setAttribute("src", `../../backend/${bookInfo.img}`);

      // 책 타이틀, 지은이 출력
      const viewMainWrap = document.querySelector(".viewMainWrap");
      const viewMainTextH1 = viewMainWrap.querySelector("h1");
      const viewMainTextSpan = viewMainWrap.querySelector("span");
      viewMainTextH1.innerHTML = `${bookInfo.title}`;
      viewMainTextSpan.innerHTML = `${bookInfo.writer}`;

      // 별점 총점 계산 + 조회수 + 댓글수

      // 별점 총점 계산
      const communityCollection = document.querySelector(
        ".communityCollection"
      );
      const colStars = communityCollection.querySelector(".colStars");
      const colStarFull = colStars.querySelector(".colStarFull");

      // -----------------------------------------------
      // 별점을 가져와 백분율로 변환하여 width 값 조정
      let starTotalStore = 0;
      let starTotalCnt = 0;
      let starAvg = 0;
      // 최대 width 값
      let starMaxWidth = 153;

      starInfo.forEach((el, index) => {
        starTotalStore += parseInt(el.starSum);
        starTotalCnt += parseInt(el.starCnt);
      });

      starAvg = (starTotalStore / starTotalCnt).toFixed(2);

      const starBarWidth = ((starAvg / 5) * 153).toFixed();
      const colStarAvg = document.querySelector(".colStarAvg");
      const colStarAvgSpan = colStarAvg.querySelector("span");

      // 만약 별점 정보가 없다면
      if (starInfo.length == 0) {
        colStarAvgSpan.innerHTML = "0";

        let colStarFullWidth = `.colStars .colStarFull { width : 0px;}`;

        let sheetIndex = documentStyleSheet.cssRules.length;
        documentStyleSheet.insertRule(colStarFullWidth, sheetIndex);
      } else {
        colStarAvgSpan.innerHTML = `${starAvg}`;

        let colStarFullWidth = `.colStars .colStarFull { width : ${starBarWidth}px;}`;

        let sheetIndex = documentStyleSheet.cssRules.length;
        documentStyleSheet.insertRule(colStarFullWidth, sheetIndex);
      }

      // 조회수 + 댓글수
      const colRatingsReviews = document.querySelector(".colRatingsReviews");
      const colRatingsReviewsSpan = colRatingsReviews.querySelector("span");

      // 작성된 리뷰의 갯수 불러와야함
      colRatingsReviewsSpan.innerHTML = `${bookInfo.viewcnt} ratings, ${thisReview.length} reviews`;

      // 책 줄거리 출력
      const textContainer = document.querySelector(".textContainer");
      textContainer.innerHTML = `${bookInfo.content}`;

      // 장르 출력
      const genre = document.querySelector(".genre");
      const genreSpan = genre.querySelectorAll("span");
      genreSpan[1].innerHTML = `${bookInfo.genre}`;

      // 페이지 수 출력
      const bookpage = document.querySelector(".bookpage");
      const bookpageSpan = bookpage.querySelectorAll("span");
      bookpageSpan[0].innerHTML = `${bookInfo.page}`;

      // 출판일 출력
      const bookpublish = document.querySelector(".bookpublish");
      const bookpublishSpan = bookpublish.querySelectorAll("span");

      const publishDate = bookInfo.publish.split("-");
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

      authorImgImg.setAttribute("src", `${author.user_img}`);

      // 작가 이름
      const authorName = document.querySelector(".authorName");
      const authorNameSpans = authorName.querySelectorAll("span");

      authorNameSpans[0].innerHTML = `${author.nickname}`;

      // -----------------------------------------------
      // ------------------ 작가가 쓴 책의 총 갯수 + 작가 팔로워 수
      authorNameSpans[1].innerHTML = `${authordata.writebooks} books, 876 followers`;
      // -----------------------------------------------

      // Ratings & Reviews 기능

      // 로그인 한 유저 프로필 사진 가져오기
      const myImg = document.querySelector(".myImg");
      const myImgImg = myImg.querySelector("img");

      myImgImg.setAttribute("src", `${userInfo.user_img}`);

      // Ratings & Reviews 별 누르면 별 채워지는 기능
      const reviewStars = document.querySelector(".reviewStars");
      const reviewStarSpan = reviewStars.querySelectorAll("span");

      let reviewsScore;
      reviewStarSpan.forEach((el, index) => {
        el.onclick = () => {
          reviewsScore = index + 1;
          for (let i = 0; i <= 4; i++) {
            if (i <= index) {
              reviewStarSpan[i].innerHTML = `<span>★</span>`;
            } else {
              reviewStarSpan[i].innerHTML = `<span>☆</span>`;
            }
          }
        };
      });

      // 작성한 댓글의 내용 받아오는곳
      const writeReviewContainer = document.querySelector(
        ".writeReviewContainer"
      );
      const writeReviewContainerInput =
        writeReviewContainer.querySelector("input");

      // 댓글 작성 버튼
      const postBtn = document.querySelector(".postBtn");

      postBtn.onclick = () => {
        if (!userInfo) {
          alert("로그인 후 댓글을 작성 할 수 있습니다.");
        }
        if (!reviewsScore) {
          alert("별점을 선택해주세요.");
          return;
        }
        const reviewInput = writeReviewContainerInput.value;
        if (!writeReviewContainerInput.value) {
          alert("댓글을 입력해주세요.");
        }
        console.log(reviewsScore);
        console.log(reviewInput);

        axios.post("http://127.0.0.1:8080/view/reviewInsert", {
          book_id: bookInfo.id,
          nickname: userInfo.nickname,
          star: reviewsScore,
          comment: reviewInput,
        });
        // 댓글을 쓰고 난 후 별 초기화
        reviewStarSpan.forEach((el, index) => {
          for (let i = 0; i <= 4; i++) {
            reviewStarSpan[i].innerHTML = `<span>☆</span>`;
          }
        });

        // 댓글을 쓰고 난 후 댓글창 초기화
        writeReviewContainerInput.value = "";
      };

      // Community Reviews

      // 가져온 별점 점수별 정리
      // ==================================================
      console.log("Community Reviews");
      const ratingsContainer = document.querySelector(".ratingsContainer");
      const fullBar = ratingsContainer.querySelectorAll(".fullBar");
      const ratingsTotal = ratingsContainer.querySelectorAll(".ratingsTotal");

      // // 별점이나 댓글이 없을 경우
      if (starInfo.length == 0) {
        let fullBarWidth = `
      .ratingsBar .ratingsBarInner .fullBar { width : 0px;}`;

        let sheetIndex = documentStyleSheet.cssRules.length;
        documentStyleSheet.insertRule(fullBarWidth, sheetIndex);
        for (let i = 0; i < 5; i++) {
          ratingsTotal[i].innerHTML = "<span> 0 (0%)</span>";
        }
      } else {
        starInfo.forEach((el, index) => {
          let starPercent;
          if (el.starCnt) {
            starPercent = (
              (parseInt(el.starCnt) / starTotalCnt) *
              100
            ).toFixed();
          } else {
            el.starCnt = 0;
            starPercent = 0;
          }

          fullBar[index].style.width = `${starPercent}%`;
          ratingsTotal[
            index
          ].innerHTML = `<span>${el.starCnt} (${starPercent}%)</span>`;
        });
      }

      // reviews area
      const commentContainer = document.querySelector(".commentContainer");
      const commentContainerP = commentContainer.querySelectorAll("p");

      // // 댓글의 총 개수를 표시
      if (thisReview?.length <= 10) {
        commentContainerP[0].innerHTML = `<p>Displaying 1 - ${thisReview.length} of ${thisReview.length} reviews</p>`;
      } else {
        commentContainerP[0].innerHTML = `<p>Displaying 1 - 10 of ${thisReview.length} reviews</p>`;
      }

      // // 댓글을 쓴 사람의 정보를 가져옴
      console.log("댓글쓴 사람 정보 가져오기");
      console.log(thisReview);

      // if(e.status == 200) end
    }

    // axios.get end
  });
}

const r_reviewOpen = document.querySelector(".r_reviewOpen");
r_reviewOpen.onclick = (e) => {
  console.log(e);
  const reCommentsWrap = document.querySelector(".reCommentsWrap");

  if (reCommentsWrap.classList.contains("active")) {
    reCommentsWrap.classList.remove("active");
  } else {
    reCommentsWrap.classList.add("active");
  }
};

getView();

async function taa() {
  axios.get("http://127.0.0.1:8080/view/test").then((e) => {
    console.log("test");
    console.log(e);
  });
}
taa();

// let starTemp = [];
// let starSum = 0;
// thisReview.forEach((el, index) => {
//   starTemp.push(parseInt(el.star));
//   starSum += parseInt(el.star);
// });
// let starArr = {};
// starTemp.forEach((x) => {
//   starArr[x] = (starArr[x] || 0) + 1;
// });

// console.log(starArr);
// console.log(starSum);
// ==================================================
