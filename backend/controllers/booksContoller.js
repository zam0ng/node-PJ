const {Books,User} = require("../models")

// 글 등록
// exports.createBooks = async(req,res)=>{
//     try {
//         const {title,writer,content,genre,page,publish}=req.body;
//         await Books.create({
//             title : title,
//             writer : writer,
//             content : content,
//             genre : genre,
//             page : page,
//             publish : publish,
//             user_id :1
            
//         })
//         res.redirect("http://127.0.0.1:8080/frontend/all.html")
//     } catch (error) {
//         console.log("createBooks에서 오류남")
//         console.log("======================================================")
//         console.log(error)
//     }
// }

exports.UserUpload = async(req,res)=>{
    try {
        console.log("여기 userupload contoller")
        console.log("req.decoded---------------------------");
        console.log(req.decoded);
        const {nickname,user_id,id} = req.decoded;
        const {title,content,genre,page,publish}=req.body;
        // await Books.update({img:req.file.path},{where:{id:body.user_id}}) 
        await Books.create({
            img: req.file.path,
            title : title,
            writer :nickname, 
            content : content,
            genre:genre,
            page:page,
            publish:publish,
            accept:0,
            reject:0,
            user_id:id,
          });
        res.send("여기 완!")
    } catch (error) {
        console.log(error)
    }
}

// 책 표지 이미지
exports.ImgLink = async (req, res) => {
    try {
      const data = await Books.findOne({ where: { id: 4} })
      res.json(data);

    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error"); // 오류 발생 시 500 상태 코드와 함께 오류 메시지를 응답
    }
  };
