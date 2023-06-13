async function getView() {
  const data = await booksAllData();
  // .then((e) => {
  console.log("then");
  console.log(data);
  const author = data.data.bookdata;
  const bookInfo = author.Books[0];
  const thisReview = bookInfo.Reviews;
  const userInfo = data.data.userdata;
  const starInfo = data.data.stardata;
  const authordata = data.data.authordata;
  const reviewInfo = data.data.reviewdata;
  // const userAlldata = e.data.userAlldata;
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
  console.log("특정 책에 있는 댓글과 대댓글 가져오기 : reviewInfo");
  console.log(reviewInfo);
  // console.log(userAlldata);

  //===============================================
  // 넘어온 데이터 가공 하는 곳
  //===============================================

  // 별점이 비어있는 경우 비어 있는 별점 채우기

  // if (starInfo.length != 5) {
  //   for (let i = 0; i < 5; i++) {
  //     for (let j = 5; j > 0; j--) {
  //       if (starInfo[i]?.star != "5") {
  //         console.log("별점 정보가 없는 별점 숫자 찾기");
  //         console.log("starInfo", j, "undefined");
  //         starInfo[j] = { star: `${j}`, starCnt: 0, starSum: 0 };
  //         continue;
  //       }
  //     }

  //     // for (let j = 5; (j = j); j--) {
  //     //   if (parseInt(starInfo[i].star) != j) {
  //     //     console.log("별점 정보가 없는 별점 숫자 찾기");
  //     //     console.log("starInfo", j, "undefined");
  //     //     starInfo[i] = { star: `${j}`, starCnt: 0, starSum: 0 };
  //     //     break;
  //     //   }
  //     // }
  //   }
  //   // starInfo.sort((a, b) => a.star - b.star);
  //   // starInfo.reverse();
  // }

  //===============================================

  // if (data.status == 200) {
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
  const communityCollection = document.querySelector(".communityCollection");
  const colStars = communityCollection.querySelector(".colStars");
  const colStarFull = colStars.querySelector(".colStarFull");

  // -----------------------------------------------
  // 여기 구간은 맨 위쪽 별점 및 조회수 그려주는 공간
  // 아래 getStarAvg 랑 헷갈리지 말것
  // -----------------------------------------------
  // 별점을 가져와 백분율로 변환하여 width 값 조정
  let starTotalStore = 0;
  let starTotalCnt = 0;
  let starAvg = 0;
  // 최대 width 값
  let starMaxWidth = 155;

  starInfo.forEach((el, index) => {
    // console.log(el);
    starTotalStore += parseInt(el.starSum);
    starTotalCnt += parseInt(el.starCnt);
  });

  starAvg = (starTotalStore / starTotalCnt).toFixed(2);

  const starBarWidth = ((starAvg / 5) * starMaxWidth).toFixed();
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
    publishDate[1] + " " + publishDate[2].substr(0, 2) + " " + publishDate[0];

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
    console.log(index);
    el.onclick = () => {
      reviewsScore = index + 1;
      for (let i = 0; i <= 4; i++) {
        if (i <= index) {
          reviewStarSpan[i].innerText = "★";
        } else {
          reviewStarSpan[i].innerText = "☆";
        }
      }
    };
  });

  // 작성한 댓글의 내용 받아오는곳
  const writeReviewContainer = document.querySelector(".writeReviewContainer");
  const writeReviewContainerInput = writeReviewContainer.querySelector("input");

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
    // console.log(reviewsScore);
    // console.log(reviewInput);

    axios.post("http://127.0.0.1:8080/view/reviewInsert", {
      book_id: bookInfo.id,
      nickname: userInfo.nickname,
      star: reviewsScore,
      comment: reviewInput,
      user_id: userInfo.id,
    });

    // 댓글을 쓰고 난 후 별 초기화
    reviewStarSpan.forEach((el, index) => {
      for (let i = 0; i <= 4; i++) {
        reviewStarSpan[i].innerText = "☆";
      }
      reviewsScore = 0;
    });

    // 댓글을 쓰고 난 후 댓글창 초기화
    writeReviewContainerInput.value = "";
    getView();
  };

  getStarAvg(starInfo);
  getComments();
}

getView();

async function taa() {
  // axios.get("http://127.0.0.1:8080/view/test").then((e) => {
  //   console.log("test");
  //   console.log(e);
  // });
  // function findKeyByValue(obj, value) {
  //   for (let key in obj) {
  //     if (typeof obj[key] === "object") {
  //       const result = findKeyByValue(obj[key], value);
  //       if (result) {
  //         return key;
  //       }
  //     } else if (obj[key] === value) {
  //       return key;
  //     }
  //   }
  //   return null;
  // }
  // const ta = { sessionID: { a: { cookie: 1 }, b: 2, c: 3, d: 4 } };
  // console.log(findKeyByValue(ta, 2)); // "sessionID"
}
// taa();

// ==================================================
// ========== then에서 빼서 별도의 함수로 만들것 ===========
// ==================================================
async function getStarAvg(starInfo) {
  // Community Reviews
  console.log("getStarAvg");
  console.log(starInfo);

  let starTotalStore = 0;
  let starTotalCnt = 0;
  let starAvg = 0;
  // 최대 width 값
  let starMaxWidth = 155;

  starInfo.forEach((el, index) => {
    // console.log(el);
    starTotalStore += parseInt(el.starSum);
    starTotalCnt += parseInt(el.starCnt);
  });

  console.log("=============================");
  console.log(starTotalStore);
  console.log(starTotalCnt);
  console.log("=============================");

  starAvg = (starTotalStore / starTotalCnt).toFixed(2);

  const starBarWidth = ((starAvg / 5) * starMaxWidth).toFixed();
  const colStarAvg = document.querySelector(".colStarAvg");
  const colStarAvgSpan = colStarAvg.querySelector("span");

  // 가져온 별점 점수별 정리
  console.log("Community Reviews");
  const ratingsContainer = document.querySelector(".ratingsContainer");
  const fullBar = ratingsContainer.querySelectorAll(".fullBar");
  const ratingsTotal = ratingsContainer.querySelectorAll(".ratingsTotal");

  const allStar = [
    { star: 5, starCnt: 0, starSum: 0 },
    { star: 4, starCnt: 0, starSum: 0 },
    { star: 3, starCnt: 0, starSum: 0 },
    { star: 2, starCnt: 0, starSum: 0 },
    { star: 1, starCnt: 0, starSum: 0 },
  ];

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
    if (starInfo) {
      starInfo.forEach((e) => {
        const insertStar = allStar.find((x) => x.star === parseInt(e.star));
        if (insertStar) {
          insertStar.starCnt = e.starCnt;
          insertStar.starSum = e.starSum;
        }
      });
    }

    allStar.forEach((el, index) => {
      let starPercent;
      if (el.starCnt) {
        starPercent = ((parseInt(el.starCnt) / starTotalCnt) * 100).toFixed();
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
}

// ==================================================
// ========== then에서 빼서 별도의 함수로 만들것 ===========
// ==================================================
async function getComments() {
  const data = await booksAllData();
  const author = data.data.bookdata;
  const bookInfo = author.Books[0];
  const thisReview = bookInfo.Reviews;
  const userInfo = data.data.userdata;
  const reviewInfo = data.data.reviewdata;
  // reviews area
  const commentContainer = document.querySelector(".commentContainer");

  const commentContainerReviewCnt = commentContainer.querySelector(
    ".commentContainerReviewCnt"
  );
  commentContainer.innerHTML = "";
  commentContainer.append(commentContainerReviewCnt);
  // // 댓글의 총 개수를 표시
  commentContainerReviewCnt.innerText = `Displaying 1 - ${thisReview.length} of ${thisReview.length} reviews`;

  // 댓글 그려주기

  const commentWrap = commentContainer.querySelector(".commentWrap");
  const commentProfile = commentContainer.querySelectorAll(".commentProfile");
  const commentProfileImg =
    commentContainer.querySelectorAll(".commentProfileImg");
  const commentProfileImgImg = commentContainer.querySelectorAll("img");

  const commentProfileInfo = commentContainer.querySelectorAll(
    ".commentProfileInfo"
  );

  const commentArea = commentContainer.querySelectorAll(".commentArea");

  const commentMainStar = commentContainer.querySelectorAll(".commentMainStar");

  const commentMainDate = commentContainer.querySelectorAll(".commentMainDate");
  console.log("댓글 테스트 구간");

  thisReview.forEach((el, index) => {
    let dateSplit = el.createdAt.split("-");

    if (dateSplit[1] == "01") dateSplit[1] = "Jan";
    if (dateSplit[1] == "02") dateSplit[1] = "Feb";
    if (dateSplit[1] == "03") dateSplit[1] = "Mar";
    if (dateSplit[1] == "04") dateSplit[1] = "Apr";
    if (dateSplit[1] == "05") dateSplit[1] = "May";
    if (dateSplit[1] == "06") dateSplit[1] = "Jun";
    if (dateSplit[1] == "07") dateSplit[1] = "Jul";
    if (dateSplit[1] == "08") dateSplit[1] = "Aug";
    if (dateSplit[1] == "09") dateSplit[1] = "Sep";
    if (dateSplit[1] == "10") dateSplit[1] = "Oct";
    if (dateSplit[1] == "11") dateSplit[1] = "Nov";
    if (dateSplit[1] == "12") dateSplit[1] = "Dec";
    let reviewStar;
    let restNum;
    // console.log("댓글 별점");
    // console.log(el.star);
    if (el.star < 5) {
      reviewStar = "★".repeat(parseInt(el.star));
      restStar = "☆".repeat(5 - parseInt(el.star));
      // console.log("restStar");
      // console.log(restStar);
      reviewStar += restStar;
    } else {
      reviewStar = "★".repeat(parseInt(el.star));
    }
    commentContainer.innerHTML += `
        <div class="commentWrap">
        <div class="commentProfile">
          <div class="commentProfileImg">
            <img src="${el.User.user_img}" alt="" />
          </div>
          <div class="commentProfileInfo">
          <span>${el.User.nickname}</span>
          <span>0 review</span>
          <span>0 follows</span>
          </div>
          <div class="commentProfileFollowbtn">
            <span>Follow</span>
          </div>
        </div>
        <div class="commentMainWrap">
          <div class="commentMainHeader">
            <div class="commentMainStar">
              <span>${reviewStar}</span>
            </div>
            <div class="commentMainDate">
            <span>${dateSplit[1]} ${dateSplit[2].slice(0, 2)}, ${
      dateSplit[0]
    }</span>
            </div>
          </div>
          <div class="commentArea">
            <p>
              ${el.comment}
            </p>
          </div>
          <span class="r_reviewOpen">${
            reviewInfo[index].r_reviews.length
          } comments</span>
          <div class="reCommentArea">
            <div class="reCommentsWrap">
            </div
          </div>
          
        </div>
      </div>
      `;
  });

  // 대댓글 comments 버튼 누르면 대댓글을 불러옴

  const commentMainWrap = document.querySelectorAll(".commentMainWrap");
  const reCommentArea = document.querySelectorAll(".reCommentArea");
  const reCommentsWrap = commentContainer.querySelectorAll(".reCommentsWrap");
  const r_reviewOpen = commentContainer.querySelectorAll(".r_reviewOpen");
  const reCommentInput = commentContainer.querySelectorAll(".reCommentInput");
  const reCommentInputInput = commentContainer.querySelectorAll("input");

  commentMainWrap.forEach((el, index) => {
    r_reviewOpen[index].onclick = (e, i) => {
      if (reCommentsWrap[index].classList.contains("active")) {
        reCommentArea[index].innerHTML = "";
        reCommentsWrap[index].classList.remove("active");
      } else {
        reviewInfo[index].r_reviews.forEach((x) => {
          reCommentArea[index].innerHTML += `
                <div class="reCommentsWrap">
                    <div class="reCommentsInner">
                      <div class="reCommentsProfileImgs">
                        <img src=${x.User.user_img} alt="" />
                      </div>
                      <div class="reComments">
                        <span>${x.nickname}</span>
                        <span>${x.review}</span>
                      </div>
                      </div>
                  </div>`;
        });
        reCommentArea[index].innerHTML += `
        <div class="reCommentInput">
                      <div class="reCommentMyimg">
                        <img src="${userInfo.user_img}" alt="" />
                      </div>
                      <input type="text" />
                      <div class="reCommentBtn">
                        <span>post</span>
                      </div>
                    </div>`;
        const reCommentBtn = commentContainer.querySelectorAll(".reCommentBtn");
        const reCommentInput = commentContainer.querySelectorAll("input");
        reCommentBtn.forEach((x, y) => {
          // console.log("reCommentBtn.forEach");
          x.onclick = (e) => {
            if (!reCommentInput[y].value) {
              alert("댓글을 입력해주세요.");
              return;
            }
            // console.log(reCommentArea[index]);
            // 대댓글 등록

            axios
              .post(
                "http://127.0.0.1:8080/view/r_reviewInsert",
                { withCredentials: true },
                {
                  params: {
                    nickname: userInfo.nickname,
                    review: reCommentInput[y].value,
                    user_id: userInfo.id,
                    review_id: thisReview[index].id,
                  },
                }
              )
              .then((e) => {
                console.log("http://127.0.0.1:8080/view/r_reviewInsert");
                console.log(e);
              });
            getView();
          };
        });

        reCommentsWrap[index].classList.add("active");
      }
    };
  });
}

// 책에 대한 모든 정보를 가져오는 axios 문법
async function booksAllData() {
  const data = await axios.get("http://127.0.0.1:8080/view");
  return data;
}
