  
  const {User,review,Books} = require("../models")
  const path = require("path")
  const jwt = require("jsonwebtoken");
  
  // 마이페이지 업로드
  exports.MypageUpload = async (req,res) => {
    try {
      
      console.log("여기 mypage contoller");
      console.log(req.session);
      const th = req.rawHeaders[33].slice(8);
      console.log(th);

      jwt.verify(th,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{

        if(err){
            res.send("다시 로그인");
        }
        else{
            req.decoded = decoded;
        }
    })
      
      const { file, body } = req;
      const {user_id}= req.decoded;
      
      // console.log(req.file,'여기는 마이페이지 업로드');
      console.log(req.file.path);
      await User.update({
        user_img: req.file.path,

      },{where:{user_id:user_id}});

    } catch (error) {
      console.log(error);
    }
  };
// 가져올때 path


  // 독자 프로필
  exports.UserImg = async (req, res) => {
    try {
      // console.log(req.decoded);
      const {user_id,nickname,gender,age,checks,user_img} = req.decoded;
      const userdata = await User.findOne({ where: {user_id:user_id} });
      // console.log("나Userimg 잘빠져나감!");
      // console.log(userdata);
  
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
      const {user_id} = req.decoded;
      console.log(user_id);
      console.log(changenick);
      await User.update({nickname:changenick},{where:{user_id : user_id}})
      console.log("nicknamechange contoller 빠짐");
      res.redirect('http://127.0.0.1:5500/frontend/mypage.html');
  } catch (error) {
      
  }
}
// 작성한 댓글 업로드
 exports.reviewUpload = async(req,res)=>{
    try {
      console.log("이거 reviewupload임------------")
      const data = await review.findAll({where:{nickname:"asd"}})
      console.log(data)
      res.json(data)
    } catch (error) {
      console.log(error)
    }
 }

