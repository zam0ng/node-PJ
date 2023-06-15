// 일단 users 테이블 안에 있는 chceks를 가져와여 한다
const {User} = require("../models")

exports.checkList = async(req,res)=>{
    try {
        const {user_id}=req.decoded
       const data = await User.findOne({ where: {user_id:user_id} });
    //    console.log(data.dataValues.checks)
       res.json(data)
    } catch (error) {
        console.log("==========checklist 오류"+error)
    }
}
// 체크리스트 삭제

exports.deleteCheck = async(req,res)=>{
    await User.destroy({
        where:{checks}
    })
    res.redirect('http://127.0.0.1:8080/check/list')
}