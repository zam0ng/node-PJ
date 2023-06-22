const {User, Books} = require("../models")

exports.buyList = async(req,res)=>{
    try {
        const {user_id}=req.decoded;
        const data = await User.findOne({ where: {user_id:user_id},raw:true, });
        console.log(data.buys);
        const as = data.buys;
        const zx = as.split(",");

        const data2 = await Books.findAll({
            where :{id:zx},raw:true
        })
        console.log("buylist contoller=====================")
        console.log(data2);
        res.json(data2)
    } catch (error) {
        console.log("buylist contoller에서 오류났음")
        console.log(error)
    }
}