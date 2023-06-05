const {User} = require("../models");
const Sequelize = require("sequelize");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async(req,res)=>{

    try {
        const {user_id, user_pw} = req.body.data;
        console.log(user_id);
        console.log(user_pw);

        const data = await User.findOne({where : {user_id}});
        console.log(data.user_pw);
        console.log(data.grade);
        if(data ==null){
            return res.send("존재하지 않는 계정");
        }

        if(data.grade == 0){
            return res.send("승인되지 않은 계정");
        }
        
        const hash = bcrypt.compareSync(user_pw,data.user_pw);
        console.log(hash);
        if(hash){
            let token = jwt.sign({
                user_id : data.user_id,
                nickname : data.nickname,
            },process.env.ACCESS_TOKEN_KEY,{
                expiresIn : "10m",
            })

            req.session.access_token = token;
            res.send("메인페이지");
        }
        else {
            return res.send("비밀번호 틀림");
        }


    } catch (error) {
        console.log("로그인 컨트롤러 오류"+error);
    }
}