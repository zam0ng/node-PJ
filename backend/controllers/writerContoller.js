const{Books} = require("../models")

// 책 승인 결과
exports.bookResult = async(req,res)=>{
    try {
      console.log("이거 bookResult임------------")
      const data = await Books.findAll({where:{user_id:1}})
      console.log(data)
      res.json(data)
    } catch (error) {
      console.log(error)
    }
 }
