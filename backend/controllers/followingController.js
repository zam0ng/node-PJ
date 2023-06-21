// user 테이블에 있는 Following을 가져와야 하는데 없음
const {User,Books}=require("../models")

exports.followingList = async(req,res)=>{

    try {
      console.log("this.followingList")
      const {author_id} = req.query;
      const {user_id} = req.decoded;
      console.log(author_id);
      console.log(user_id);
      const userdata = await User.findOne({
        where : {user_id},
        raw:true,
      });

      let tz;
      console.log("userdata-------------------")
      console.log(userdata);
      console.log(userdata.following);
      console.log("userdata-----------------")
      if(userdata.following==""){
        tz = author_id;
      }
      else{
        tz = userdata.following+","+author_id
      }
      await User.update({
        following : tz,
      },{where : {user_id}})
      res.send();
  
    } catch (error) {
      console.log("view컨트롤러 following에서 오류남"+error);
    }
  }
  exports.followadd = async(req,res)=>{
    try {
        const {user_id}=req.decoded;
        const data = await User.findOne({ where: {user_id:user_id},raw:true});
        console.log("여기 followadd임")
        console.log(data);
        const as = data.following
        const qw = as.split(",")
        const data2 = await User.findAll({where:{id:qw}})
       console.log("=====================")
        console.log(data2)
        res.json(data2)
    } catch (error) {
        console.log("여기 followadd error임")
      console.log(error)  
    }
  }
  
  exports.followdel = async(req,res)=>{
    try {
      const {user_id}=req.decoded;
      const {author_id}=req.query;
      console.log(user_id)
      console.log(author_id);
      const data = await User.findOne({ where : {user_id},raw:true})
      // console.log("----------여기 followdel")
      console.log(data.following)
      const followstr = data.following;
      const tr = followstr.split(",");
      const result = tr.filter(num => num!=author_id)
      // console.log("----------------result")
      // console.log(tr);
      // console.log(result)
      // console.log("----------------result")
      const result2 = result.join();
      await User.update({
        following : result2},{where:{user_id}})

      res.send();

    } catch (error) {
      console.log("followdel에서 오류남"+error);
    }
  }