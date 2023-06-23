const {User, Books} = require("../models")
exports.buyList = async(req,res)=>{
    try {
        const {user_id}=req.decoded;
        const data = await User.findOne({ where: {user_id:user_id, }, raw:true});
        const as = data.buys;
        const zx = as.split(",");
       let q ="";
        if (data.buys == "") {
          q = req.params.id;
        } else {
        q= data.buys
        }
        await User.update(
          {
              buys: q,
          },
          { where: { user_id } }
        );
        const data2 = await Books.findAll({
            where :{id:zx},raw:true
        })
        res.json(data2)
    } catch (error) {
        console.log("buylist contoller에서 오류났음")
        console.log(error)
    }
}