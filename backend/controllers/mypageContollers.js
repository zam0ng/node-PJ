  
  const {User,review,Books, sequelize, r_review} = require("../models")
  const path = require("path")
  const jwt = require("jsonwebtoken");
  
  // 마이페이지 업로드
  exports.MypageUpload = async (req,res) => {
    try {
      
      const { file, body } = req;
      const {user_id}= req.decoded;
      
      // console.log(req.file,'여기는 마이페이지 업로드');
      console.log(req.file.path);
      await User.update({
        user_img: "/" + req.file.path,

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
      res.redirect('/mypage.html');
  } catch (error) {
      console.log(error)
  }
}
// 작성한 댓글 업로드
exports.reviewUpload = async(req,res)=>{
  try {
    const {nickname,user_id} = req.decoded;

    console.log(nickname);
    // const data = await review.findAll({
    //   // 리뷰 테이블과 books 테이블이 조인되어있으니깐
    //   // include 로 books를 가져오고
    //   // attributes 로 가져오고 싶은 컬럼 셀렉한다
    //   include: [{
    //     model: Books,
    //   }],
    //     // include: [{
    //     //   model: r_review,
    //     // }],

    //   where:{
    //     nickname:nickname,
        
    // },raw:true, 
    // });

    const data = await review.findAll({
      // 리뷰 테이블과 books 테이블이 조인되어있으니깐
      // include 로 books를 가져오고
      // attributes 로 가져오고 싶은 컬럼 셀렉한다
      include: [{
        model: Books,
        attributes :["img","title"]
      }],
      where: {
        user_id: user_id,

      }
    })

    console.log(data);
    

    const data2 = await r_review.findAll({
      
      include: [{
        model: review,
        
        attributes :["comment"]
        
      }],
        where:{
          user_id:user_id
      }
    })
  
    const dataobj = {data,data2};
    res.json(dataobj);
  } catch (error) {
    console.log(error)
  }
}

