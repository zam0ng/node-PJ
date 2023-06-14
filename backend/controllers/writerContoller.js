const{Books,User} = require("../models")


  // 작가페이지 업로드
  exports.WriterUpload = async (req,res) => {
   
    try {
      
      console.log("=======================================");
      console.log(req.decoded);
      console.log("=======================================");
      
      const { file, body } = req;
      const {user_id} = req.decoded;
      // console.log(body.changenick)
      const userImg = "/" +  req.file.path;
      
      // console.log(req.file,'여기는 마이페이지 업로드');
      await User.update({
        user_img: userImg,
      
      },{where:{user_id:user_id}});
      console.log("나WriterUpload에서 찍힘")
      res.send("I made it here");
    } catch (error) {
      console.log(error);
    }
  };
    // 작가 프로필
    exports.UserImg = async (req, res) => {

      // console.log("여기 mypage contoller")
      // console.log(req.decoded);
      const {user_id,nickname,gender,age,checks,user_img} = req.decoded;
      try {
        const userdata = await User.findOne({ where: { user_id :user_id} });
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
      const {user_id} = req.decoded;

      await User.update({nickname:changenick},{where:{user_id}})
      console.log("nicknamechange contoller 빠짐");
      res.redirect('http://127.0.0.1:5500/frontend/writerpage.html');
  } catch (error) {
      
  }
}
  
// 책 승인 결과
exports.bookResult = async(req,res)=>{
    try {
      console.log("이거 bookResult임------------")
      const data = await Books.findAll({where :{accept:1}})
      console.log(data)
      res.json(data)
    } catch (error) {
      console.log(error)
    }
 }
// 책 거절 결과
 exports.bookResult2 = async(req,res)=>{
  try {
    console.log("이거 bookResult임------------")
    const data = await Books.findAll({where :{accept:-1}})
    console.log(data)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}

// 책 대기 결과
exports.bookResult3 = async(req,res)=>{
  try {
    console.log("이거 bookResult임------------")
    const data = await Books.findAll({where :{accept:0}})
    console.log(data)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
}
