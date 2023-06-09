const jwt = require("jsonwebtoken");

exports.islogin = async(req,res,next) =>{
    try {

        console.log("req.session ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ")
        console.log(req.sessionID);
        console.log(req.sessionStore.sessions);
        if(req.sessionID in req.sessionStore.sessions){
            console.log("같음");
        }
        else{
            console.log("다름");
        }
        // console.log("req.query" +req.query);
        // console.log(req);
        // console.log("islogin");
        const  access_token =req.sessionStore.sessions;
        // console.log(req);
        console.log("제발 초기화")
        console.log(access_token);
        
        let ta = JSON.stringify(access_token);
        // let tb = ta.split(",");
        let tb = (ta||'').split(",");
        // let tc = tb[4].split(":");
        let tc = (tb[4]||'').split(":");
        let td = (tc[1]||'').replace('\\\"',"");
        // let td = (tc[1]).replace('\\\"',"");
        let te = td.substring(-1,(td.length-5));

        // console.log(te);
        
        jwt.verify(te,process.env.ACCESS_TOKEN_KEY,(err,decoded)=>{

            if(err){
                res.send("다시 로그인");
            }
            else{
                console.log(decoded);
                req.decoded = decoded;
                next();
            }
        })
    
    } catch (error) {
        console.log("islogin 컨트롤러에서 오류남"+error);
    }
}
