const Sequelize = require("sequelize");
const {User} = require("../models");
const bcrypt = require("bcrypt");

exports.adminsignup = async(User) =>{
    
    const admin_pw = "admin"
    const hash = bcrypt.hashSync(admin_pw,10);

    User.create({
        user_img : "./img/admin.png",
        user_id : "admin",
        user_pw : hash,
        gender : "man",
        role : "admin",
        age : "999",
        grade: "999",
        nickname : "admin",
        checks : "999",
        tk : "",
    })
}