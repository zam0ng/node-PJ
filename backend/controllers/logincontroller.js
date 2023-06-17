const { User } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

exports.login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.query;

    const data = await User.findOne({ where: { user_id } });
    // console.log(data.user_pw);
    // console.log(data.grade);
    if (data == null) {
      return res.send("존재하지 않는 계정");
    }

    if (data.grade == 0) {
      return res.send("승인되지 않은 계정");
    } else if (data.grade < 0) {
      return res.send("승인거절");
    } else if (user_pw == null) {
      return res.send("패스워드 없음");
    }

    const hash = bcrypt.compareSync(user_pw, data.user_pw);
    // console.log(hash);
    if (hash) {
      let token = jwt.sign({
        id: data.id,
        user_img: data.user_img,
        user_id: data.user_id,
        nickname: data.nickname,
        role: data.role,
        gender: data.gender,
        checks: data.checks,
        age: data.age,
        sessionID: req.sessionID,
      }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "60m",
      })


      req.session.access_token = token;
      // console.log("logincontroller / req.sessionID")
      // console.log(req.sessionID)
      await User.update({
        tk: req.sessionID,
      }, { where: { user_id } }).then((e) => {
        console.log("tk insert com")
      }).catch((err) => {
        console.log(err);
      })

      // req.query = token;
      // console.log(req.query);
      console.log("bbbbbbbbbbbbbbbbbbb");
      if (user_id == "admin") {
        res.send("어드민");
      }
      else {
        return res.send({ msg: "로그인 성공", token: req.session.access_token });
        //  res.send("로그인 성공");
        // return res.json("1")
        // res.redirect("http://127.0.0.1:5500/frontend/index.html");
      }
    }
    else {
      return res.send("비밀번호 틀림");
    }


  } catch (error) {
    console.log("로그인 컨트롤러 오류" + error);
  }
}

exports.logout = async (req, res) => {
  console.log(req);
  console.log("로그아웃 컨트롤러에 들어오니>");
  try {
    // 현재 브라우저 토큰값
    const th = req.rawHeaders[29].slice(8);
    console.log(th);

    // 특정 값을 갖는 키를 찾는 함수를 정의합니다.
    function findKeyByToken(obj, token) {
      for (let key in obj) {
        if (typeof obj[key] === "string") {
          let parsedObj;
          try {
            // JSON 문자열을 파싱하여 객체로 변환합니다.
            parsedObj = JSON.parse(obj[key]);
          } catch (err) {
            // 파싱 실패 시에는 다음 키로 이동합니다.
            continue;
          }
          if (parsedObj.access_token === token) {
            // 원하는 값을 찾았다면, 해당 키를 반환합니다.
            return key;
          }
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          // 값이 객체일 경우, 재귀적으로 함수를 호출하여 탐색을 계속합니다.
          const result = findKeyByToken(obj[key], token);
          if (result) {
            return result;
          }
        }
      }
      return null;
    }
    const ta = req.sessionStore.sessions;
    const nowsessioid = findKeyByToken(ta, th); // "aewSIDVHKOMg9OpzsrsCap

    // res.clearCookie('mytoken', {path : "/"});
    req.sessionStore.all((err, sessions) => {
      if (err) {
        return res.sendStatus(500);
      }

      const sessionIds = Object.keys(sessions);

      // Delete each session by ID
      sessionIds.forEach((el) => {
        // if(sessionId) {
        console.log(el);
        console.log(nowsessioid);
        if (el == nowsessioid) {
          // }
          req.sessionStore.destroy(nowsessioid, (err) => {
            if (err) {
              console.error("Error destroying session:", err);
            } else {
              console.log("Session destroyed successfully:", nowsessioid);
              console.log(ta);
            }
          });
        }
      });

      res.sendStatus(200);
    });
  } catch (error) {
    console.log("로그아웃 컨트롤러에서 오류" + error);
  }
};

exports.logout2 = async (req, res) => {
 
  try {
    const {access_token} = req.session;
    console.log(access_token);
    access_token = "";
    console.log("-------------------access_token")
    console.log(access_token)
    res.sendStatus(200);
  } catch (error) {
    console.log("로그아웃 컨트롤러에서 오류" + error);
  }
};