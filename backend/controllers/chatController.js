const e = require("express");
const { Chat, User, sequelize } = require("../models");
const jwt = require("jsonwebtoken");
const {Op,}= require("sequelize");
const Sequelize = require("sequelize");
// const sequelize = require('sequelize');

exports.saveChat = async (req, res) => {
  try {
    const { user_name, text, chat_id } = req.body;
    await Chat.create({ user_name, text, chat_id });
  } catch (error) {
    console.error(error);
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { user_id } = req.query;
    const data = await User.findOne({
      attributes: ["id", "user_id"],
      where: { user_id },
    });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.getChatData = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await Chat.findAll({ where: { chat_id: id }, raw: true });
    res.json(data);
  } catch (error) {
    console.error(error);
  }
};

exports.getUserName = async(req,res) =>{
    console.log("getUserName 들어옴?")
    try {
        const data = await Chat.findAll({
            attributes:["user_name"],
            where :{
                // admin은 제외 
                user_name: {
                    [Op.ne] : "admin"
                }
            },
            group : "user_name",
            raw:true,
        })

        console.log("-------------data");
        console.log(data);
        console.log("-------------data");
        
        res.json(data);
        } catch (error) {
        console.log("getUserName 에서 오류남"+error);
    }
}

exports.confirmZero= async(req,res)=>{
    try {
        // const data = await Chat.findAll({
        //     attributes:["user_name",
        //     [sequelize.fn('COUNT', sequelize.col("*")),"zeroCnt"]
        // ],
        //     where:{
        //         confirm : false,

        //         user_name :{
        //             [Op.ne] : "admin"
        //         }

        //     },
        //     group : "user_name",
        //     raw:true,
        // })
        const data = await sequelize.query(
            `SELECT A.user_name, COALESCE(B.asd, 0) AS zeroCnt
             FROM (
               SELECT user_name
               FROM chat
               WHERE user_name <> "testadmin"
               GROUP BY user_name
             ) A
             LEFT OUTER JOIN (
               SELECT user_name, COUNT(*) AS asd
               FROM chat
               WHERE confirm = 0
               GROUP BY user_name
             ) B ON A.user_name = B.user_name;`, 
          { type: Sequelize.QueryTypes.SELECT });
          
        console.log("-----------------confirmZero");
        console.log(data);
        console.log("-----------------confirmZero");
        
        res.json(data);
    } catch (error) {
        console.log("chat 컨트롤러 confirmZero에서 오류남"+error);
    }
}

exports.changeone = async(req,res)=>{
    try {
        console.log(req.query);
        const {chat_id}=req.query;

        await Chat.update({
            confirm : true,
        },{
            where :{
                chat_id : chat_id,
            }
        })
    } catch (error) { 
        console.log("chat 컨트롤러 changeone 에서 오류남"+error);
    }
}
