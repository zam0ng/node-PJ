const Sequelize = require("sequelize");
const {Books} = require("../models");
const { parse } = require("path");

exports.allview = async(req,res)=>{
    
    try {
        await Books.findAll({
            where : {
                accept :true,
            }
        }).then((e)=>{
            // console.log(e.Books.length);
            
            const eArr=[];
            e.forEach((el,index) => {
                // console.log(el.dataValues);

                eArr.push(el.dataValues);
            });

            res.json(eArr);
            })
    } catch (error) {
        console.log("allview 컨트롤러 오류"+ error);
    }
}

exports.allview2 = async(req,res)=>{
    
    let {id} = req.query;
    if(id==undefined){
        id=0;
    }
    let ta = parseInt(id)+9;
    try {
        await Books.findAll({
            where : {
                accept :true,
            },
            limit :ta,
        }).then((e)=>{
            // console.log(e.Books.length);
            
            const eArr=[];
            e.forEach((el,index) => {
                // console.log(el.dataValues);

                eArr.push(el.dataValues);
            });

            res.json(eArr);
            })
    } catch (error) {
        console.log("allview 컨트롤러 오류"+ error);
    }
}

exports.conan = async(req,res)=>{
    const genre = "conan"

    try {
        await Books.findAll({
            where : {
                genre,
                accept :true,
            }
        }).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("conan 컨트롤러 오류"+ error);
    }
}

exports.horror = async(req,res)=>{
    const genre = "horror"

    try {
        await Books.findAll({
            where : {

                genre,
                accept :true,
                
            }}).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("horror 컨트롤러 오류"+ error);
    }
}

exports.fantasy = async(req,res)=>{
    const genre = "fantasy"

    try {
        await Books.findAll({
            where : {
                genre,
                accept :true,
            }}).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("fantasy 컨트롤러 오류"+ error);
    }
}

exports.sorim = async(req,res)=>{
    const genre = "sorim"

    try {
        await Books.findAll({
            where : {
                genre,
                accept :true,
            }}).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("sorim 컨트롤러 오류"+ error);
    }
}

exports.game = async(req,res)=>{
    const genre = "game"

    try {
        await Books.findAll({
            where : {
                genre,
                accept :true,
            }}).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("game 컨트롤러 오류"+ error);
    }
}

exports.romance = async(req,res)=>{
    const genre = "romance"

    try {
        await Books.findAll({
            where : {
                genre,
                accept :true,
            }}).then((e)=>{

            // console.log(elength);
            const eArr1=[];
            e.forEach((el,index) => {
                

                eArr1.push(el.dataValues);
            });

            res.json(eArr1);
        })


    } catch (error) {
        console.log("romance 컨트롤러 오류"+ error);
    }
}