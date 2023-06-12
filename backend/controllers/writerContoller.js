const{Books,User} = require("../models")


  // 작가페이지 업로드
  exports.WriterUpload = async (req,res) => {
    try {
      console.log("여기 mypage contoller")
      const { file, body } = req;
      console.log(body.changenick)
      
      // console.log(req.file,'여기는 마이페이지 업로드');
      await User.update({
        user_img: req.file.path,
        user_id: "qwe",
        user_pw: "qwe",
        gender: "female",
        role: "writer",
        age: 20,
        grade: 2,
        nickname: "writer",
        check: 12,
      },{where:{id:1}});
      console.log("나WriterUpload에서 찍힘")
      res.send("I made it here");
    } catch (error) {
      console.log(error);
    }
  };
    // 작가 프로필
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
      res.redirect('http://127.0.0.1:5500/frontend/writer.html');
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
