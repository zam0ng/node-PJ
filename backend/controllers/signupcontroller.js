const Sequelize = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const {
      user_id,
      user_pw,
      user_re_pw,
      user_gender,
      user_role,
      user_age,
      user_nick,
      email,
    } = req.body.data;

    const aa = user_age.split("-");
    const bb = 2023 - parseInt(aa[0]);
    if (user_re_pw != user_pw) {
      return res.send("비밀번호 불일치");
    }
    const data = await User.findOne({ where: { user_id } });
    if (data != null) {
      return res.send("이미 존재하는 계정");
    }

    const hash = bcrypt.hashSync(user_pw, 10);

        await User.create({

            user_id : user_id,
            user_pw : hash,
            gender : user_gender,
            role : user_role,
            age : bb,
            grade : "0",
            nickname : user_nick,
            tk : "",
            checks : "",
            auth : "",
            following : "",
            buys : "",
            email : email,
        }).then((e)=>{
            return res.send("가입성공");
        })
        
   } catch (error) {
        console.log("사인 컨트롤러에서 오류남" +error);
   }
}