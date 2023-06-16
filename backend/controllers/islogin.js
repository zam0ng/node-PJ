const jwt = require("jsonwebtoken");

exports.islogin = async (req, res, next) => {
  try {
    const {access_token} = req.session;

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log("다시 로그인");
        res.send("다시 로그인");
      } else {
        console.log("islogin");
        console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    console.log("islogin 컨트롤러에서 오류남" + error);
  }
};
exports.islogin2 = async (req, res, next) => {
  try {
    // console.log(req.rawHeaders[39]);
    // console.log(th);
    let th;
    console.log("req.rawHeaders");
    console.log(req.rawHeaders);
    req.rawHeaders.forEach((element, index) => {
      const name = "mytoken";

      if (element.startsWith(name)) {
        return (th = element);
      }
    });

    console.log("---------th-------");
    th = th.slice(8);

    jwt.verify(th, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log("다시 로그인");
        res.send("다시 로그인");
      } else {
        console.log("islogin2");
        console.log(decoded);
        req.decoded = decoded;

        next();
      }
    });
  } catch (error) {
    console.log("islogin 컨트롤러에서 오류남" + error);
  }
};
// console.log(req);
// console.log(req.rawHeaders);
// console.log(req.rawHeaders[29]);
// console.log(req.rawHeaders[29].slice(8));

// console.log("req.session ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
// console.log(req.sessionID);
// console.log(req.sessionStore.sessions);
// if(req.sessionID in req.sessionStore.sessions){
//     console.log("같음");
// }
// else{
//     console.log("다름");
// }
// console.log("req.query" +req.query);
// console.log(req);
// console.log("islogin");
// const  {access_token} =req.sessionStore.sessions;
// console.log(access_token);
// // console.log(req);
// // console.log("제발 초기화")
// // console.log(access_token);

// let ta = JSON.stringify(access_token);
// // let tb = ta.split(",");
// let tb = (ta||'').split(",");
// // let tc = tb[4].split(":");
// let tc = (tb[4]||'').split(":");
// let td = (tc[1]||'').replace('\\\"',"");
// // let td = (tc[1]).replace('\\\"',"");
// let te = td.substring(-1,(td.length-5));

// console.log("te");
// console.log(te);
// console.log(th);
