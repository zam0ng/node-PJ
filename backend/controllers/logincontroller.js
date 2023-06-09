const {User} = require("../models");
const Sequelize = require("sequelize");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");

exports.login = async(req,res)=>{

    try {
        
        const {user_id, user_pw} = req.body.data;
      
        const data = await User.findOne({where : {user_id}});
        // console.log(data.user_pw);
        // console.log(data.grade);
        if(data ==null){
            return res.send("존재하지 않는 계정");
        }

        if(data.grade == 0){
            return res.send("승인되지 않은 계정");
        }
        else if(data.grade < 0){
            return res.send("승인거절");
        }
        
        const hash = bcrypt.compareSync(user_pw,data.user_pw);
        console.log(hash);
        if(hash){
            let token = jwt.sign({
                user_id : data.user_id,
                nickname : data.nickname,
                role : data.role,
                sessionID : req.sessionID,
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "10m",
            })


            req.session.access_token = token;
            console.log(req.sessionID)
            
            // req.query = token;
            // console.log(req.query);
            console.log("bbbbbbbbbbbbbbbbbbb");
            if(user_id =="admin"){
                 res.send("어드민");
            }
            else{
                return res.send({msg : "로그인 성공", token : req.session.access_token});
                //  res.send("로그인 성공");
                // return res.json("1")
                // res.redirect("http://127.0.0.1:5500/frontend/index.html");
            }
        }
        else {
            return res.send("비밀번호 틀림");
        }


    } catch (error) {
        console.log("로그인 컨트롤러 오류"+error);
    }
}

exports.logout = async (req,res) =>{
    console.log("로그아웃 컨트롤러에 들어오니>");
    try {
        // res.clearCookie('mytoken', {path : "/"});
        req.sessionStore.all((err, sessions) => {
            if (err) {
              console.error('Error fetching sessions:', err);
              return res.sendStatus(500);
            }
        
            const sessionIds = Object.keys(sessions);
            console.log(sessionIds);
            // Delete each session by ID
            sessionIds.forEach(sessionId => {
                if(sessionId) {

                }
              req.sessionStore.destroy(sessionId, (err) => {
                if (err) {
                  console.error('Error destroying session:', err);
                } else {
                  console.log('Session destroyed successfully:', sessionId);
                }
              });
            });
        
            res.sendStatus(200);
          });
          
    } catch (error) {
        console.log("로그아웃 컨트롤러에서 오류"+ error);
    }
}