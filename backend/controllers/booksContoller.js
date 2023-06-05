const {Books,User} = require("../models")

// 글 등록
exports.createBooks = async(req,res)=>{
    try {
        const {acc_decoded}=req;
        const {title,wirter,content,genre,page,publish}=req.body;
        await Books.create({
            title : title,
            wirter : wirter,
            content : content,
            genre : genre,
            page : page,
            publish : publish,
            
        })
        res.redirect("http://127.0.0.1:5500/frontend/books.html")
    } catch (error) {
        console.log("createBooks에서 오류남")
        console.log("======================================================")
        console.log(error)
    }
}

exports.UserUpload = async(req,res)=>{
    try {
        const {file,body}=req;
        console.log(req.file);
        console.log(body.user_id);
        console.log(body.imgs);
        console.log(req.file.path);
        // await Books.update({img:req.file.path},{where:{id:body.user_id}}) 
        await Books.create({
            img: req.file.path,
            title : 123,
            writer :"zxc",
            content : 123,
            genre:1,
            page:1,
            publish:1,
            accept:1,
            reject:1,
            user_id:1

          });
        res.send("여기 완!")
    } catch (error) {
        console.log(error)
    }
}

// 이미지 링크 가져오기
// exports.ImgLink = async(req,res)=>{
//     try {
//         console.log("afbjsabJFS=======================================")
//        const data =  await Books.findOne({where:2})
//     //    console.log(data.dataValues.img)
//     console.log("나 잘빠져나감!")
//         return data.dataValues.img
//     } catch (error) {
//         console.log(error)
//     }
// }

exports.ImgLink = async (req, res) => {
    try {
      console.log("afbjsabJFS=======================================");
      const data = await Books.findOne({ where: { id: 2 } });
      console.log("나 잘빠져나감!");
  
      res.send(data.dataValues.img); // 데이터를 클라이언트에 응답
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error"); // 오류 발생 시 500 상태 코드와 함께 오류 메시지를 응답
    }
  };
  