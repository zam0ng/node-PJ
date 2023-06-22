const jwt = require("jsonwebtoken");

exports.islogin = async (req, res, next) => {
  try {
    const { access_token } = req.session;

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log("다시 로그인");
        // window.location.href = "http://13.209.64.80/";
        // res.redirect("http://13.209.64.80/");
        res.send("relogin");
        // next();
      } else {
        // console.log("islogin");
        // console.log(decoded);
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    console.log("islogin 컨트롤러에서 오류남" + error);
  }
};

exports.adminislogin = async (req, res) => {
  try {
    const { access_token } = req.session;
    console.log(access_token);
    console.log(access_token == undefined);
    console.log(access_token == "undefined");
    if (access_token == undefined) {
      res.send("undi");
    }
  } catch (error) {
    console.log("adminislogin 컨트롤러에서 오류남" + error);
  }
};
exports.islogin2 = async (req, res, next) => {
  try {
    let th;
    req.rawHeaders.forEach((element, index) => {
      const name = "mytoken";

      if (element.startsWith(name)) {
        return (th = element);
      }
    });

    th = th.slice(8);

    jwt.verify(th, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log("다시 로그인");
        res.send("다시 로그인");
      } else {
        req.decoded = decoded;

        next();
      }
    });
  } catch (error) {
    console.log("islogin 컨트롤러에서 오류남" + error);
  }
};

exports.getLoginUser = async (req, res) => {
  try {
    const { access_token } = req.session;

    jwt.verify(access_token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        console.log("로그인 정보 만료");
      } else {
        const data = decoded;
        res.json(data);
      }
    });
  } catch (error) {
    console.error("getLoginUser", error);
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
// console.log("같음");
// }
// else{
// console.log("다름");
// }
// console.log("req.query" +req.query);
// console.log(req);
// console.log("islogin");
// const  {access_token} =req.sessionStore.sessions;
// console.log(access_token);

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
