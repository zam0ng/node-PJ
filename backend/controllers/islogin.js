const jwt = require("jsonwebtoken");

exports.islogin = async(req,res) =>{
    try {
        const  {access_token} =req.session;

        jwt.verify(access_token,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{

            if(err){
                res.send("다시 로그인");
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    } catch (error) {
        console.log("islogin 컨트롤러에서 오류남"+error);
    }
}
