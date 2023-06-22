const Sequelize = require("sequelize");
const { User } = require("../models");
const bcrypt = require("bcrypt");

exports.adminsignup = async (User) => {
  const admin_pw = "testadmin";
  const hash = bcrypt.hashSync(admin_pw, 10);

  User.create({
    user_img: "./img/admin.png",
    user_id: "testadmin",
    user_pw: hash,
    gender: "man",
    role: "testadmin",
    age: "999",
    grade: "999",
    nickname: "testadmin",
    checks: "999",
    tk: "",
  });
};
