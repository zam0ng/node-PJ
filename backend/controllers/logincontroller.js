const { User } = require("../models");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const nodemailer = require("nodemailer");
const { raw } = require("express");

exports.login = async (req, res) => {
  try {
    const { user_id, user_pw } = req.query;
    console.log(req.query);

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
      let token = jwt.sign(
        {
          id: data.id,
          user_img: data.user_img,
          user_id: data.user_id,
          nickname: data.nickname,
          role: data.role,
          gender: data.gender,
          checks: data.checks,
          age: data.age,
          sessionID: req.sessionID,
        },
        process.env.ACCESS_TOKEN_KEY,
        {
          expiresIn: "60m",
        }
      );

      req.session.access_token = token;
      // console.log("logincontroller / req.sessionID")
      // console.log(req.sessionID)
      await User.update(
        {
          tk: req.sessionID,
        },
        { where: { user_id } }
      )
        .then((e) => {
          console.log("tk insert com");
        })
        .catch((err) => {
          console.log(err);
        });

      // req.query = token;
      // console.log(req.query);
      console.log("bbbbbbbbbbbbbbbbbbb");
      if (user_id == "admin") {
        res.send("어드민");
      } else {
        return res.send({
          msg: "로그인 성공",
          token: req.session.access_token,
        });
        //  res.send("로그인 성공");
        // return res.json("1")
        // res.redirect("http://127.0.0.1:5500/frontend/index.html");
      }
    } else {
      return res.send("비밀번호 틀림");
    }
  } catch (error) {
    console.log("로그인 컨트롤러 오류" + error);
  }
};

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
    
    // let {access_token} = req.session;
    // console.log(access_token);
    // access_token = null;
    // console.log("-------------------access_token")
    // console.log(access_token)


    // console.log(req.session);
    // req.session = nul;l"""
    
    // console.log("-------------------access_token")
    // console.log(req.session)

    req.session.destroy(function(err) {
      if (err) {
        console.log("Error destroying session:", err);
      } else {
        // Session destroyed successfully
        // Any associated session data is cleared
      }
    });

    res.sendStatus(200);
  } catch (error) {
    console.log("로그아웃 컨트롤러에서 오류" + error);
  }
};

exports.mailauth= async(req,res)=>{

  console.log(req.query);

  const {user_id,user_email} = req.query;
  
  const data =await User.findOne({
    where: {
      user_id : user_id,
    }
    ,raw:true,
  })
  console.log(data);
  if(!data){
    return res.send("없는아이디")
  }
  if(data.email !=user_email){
    return res.send("가입메일일치안함")
  }
  const mailnum = Math.floor(Math.random() * 10 ** 8)
      .toString()
      .padStart("0", 8);

  console.log(mailnum);
  await User.update({
    auth : mailnum,
  },{where :{
    user_id:user_id,
  }})
   res.send("일치!");

  console.log(process.env.gmailpass);
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "sinze27@gmail.com",
      pass: process.env.gmailpass,
    },
  });
  
  const message = {
  
    from: "sinze27@gmail.com",
  
    // 유저의 메시지를 불러오기
    to: user_email,
  
    subject: "비밀번호 변경 인증번호 메일입니다.",
  
    // 여기에는 인증번호 난수
    text: mailnum,
  };
   
  transport.sendMail(message, (err, info) => {
    if (err) {
      console.error("err", err);
      return;
    }
   
    console.log("ok", info);
  });
}

exports.auth= async(req,res)=>{
try {
  console.log(req.query);
  const {auth,user_id} = req.query;
  console.log(auth);
  const data = await User.findOne({
    where :{
      user_id : user_id,
      auth : auth,
    }
  })
  console.log(data.id);
  if(!data){
    console.log("인증번호불일치")
    return res.send("인증번호불일치")
  }
  else{
    console.log("인증성공")
    return res.send({id : data.id , msg : "인증성공"});
  }

  // console.log(data);
} catch (error) {
  console.log("auth 컨트롤러에서 오류남"+error);
}
}

exports.changepwd = async(req,res)=>{

try {
  console.log(req.query);
  const {id,user_pw,user_repw} = req.query;
  
  const hash = bcrypt.hashSync(user_pw,10)

  await User.update({
    user_pw : hash,
  },{
    where : {
      id : id,
    }
  })

} catch (error) {
  console.log("changepwd 컨트롤러에서 오류남 "+error);
}
}