  
  const {User} = require("../models")
  const path = require("path")
  
  // 마이페이지 업로드
  exports.MypageUpload = async (req,res) => {
    try {
      console.log("여기 mypage contoller")
      const { file, body } = req;
      console.log(body.changenick)
      
      // console.log(req.file,'여기는 마이페이지 업로드');
      await User.update({
        user_img: req.file.path,
        user_id: 123,
        user_pw: 123,
        gender: "Men",
        role: 1,
        age: 10,
        grade: 1,
        nickname: "happy",
        check: 12,
      },{where:{id:1}});
      console.log("나mypagecontoller에서 찍힘")
      res.send("I made it here");
    } catch (error) {
      console.log(error);
    }
  };
// 가져올때 path


  // 유저 프로필
  exports.UserImg = async (req, res) => {
    try {
      const userdata = await User.findOne({ where: { id: 1} });
      console.log("나Userimg 잘빠져나감!");
      console.log(userdata);
  
      res.json(userdata); // 데이터를 클라이언트에 응답
      // res.json(userdata)
    } catch (error) {
      console.log(error);
    }
  };

  // 닉네임 바꾸기

exports.NickChange = async (req,res)=>{
  try {
      const {changenick}=req.body;
      await User.update({nickname:changenick},{where:{id:1}})
      console.log("nicknamechange contoller 빠짐");
      res.redirect('http://127.0.0.1:5500/frontend/mypage.html');
  } catch (error) {
      
  }
}

