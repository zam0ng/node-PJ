const Sequelize = require("sequelize");
const {User} =require("../models");
const { findAll } = require("../models/review");

exports.nonagreeuser = async(req,res) =>{

    try {
        const user = await User.findAll({});
        // console.log(user);
        const gradeArr = [];
       
        user.forEach((el,index)=>{

            if(el.grade=="0"){
                gradeArr.push(el.dataValues);
                
            }
            // console.log("mmmmmmmmmmmmmm")
            // console.log(gradeArr);
            
        })
            // console.log(gradeArr);
            const data = gradeArr;
            // console.log(data[0]);
            res.json(data);
        
    } catch (error) {
        console.log("논어그리 유저에서 오류남"+error);
    }
}

exports.gradeUpdate = async(req,res)=>{

    try {
        const {grade,user_id} = req.body.data;
        console.log(grade);
        console.log(user_id);

        await User.update({
            grade : grade,
        },{where :{user_id}}).then((e)=>{
            console.log("update com")
        }).catch((err)=>{
            console.log("err");
        })

    } catch (error) {
        console.log("gradeupdate 에서 오류남 "+error);
    }
}

exports.nonagreepost = async(req,res) =>{

    try {
        
    } catch (error) {
        
    }

}