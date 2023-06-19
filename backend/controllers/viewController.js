const { raw } = require("express");
const { Books, User, review, r_review } = require("../models");
const { sequelize } = require("../models");
const url = require("url");
const e = require("express");

// 책번호를 가져와 books의 정보와 작가의 정보를 가져옴
exports.viewInfo = async (req, res) => {
  console.log("하이");
  // console.log("req");
  // console.log(req);
  // console.log("req");
  // console.log(req);
  try {
    // 가져온 책의 번호
    let booknum = req.params.id;
    // console.log("const booknum = req.params.id;");
    // console.log(booknum);

    // 책에 대한 정보와 작가의 정보 가져오기
    const bookdata = await User.findOne(
      {
        include: [
          {
            model: Books,
            attributes: [
              "id",
              "img",
              "title",
              "writer",
              "page",
              "content",
              "genre",
              "publish",
              "user_id",
              "viewcnt",
            ],
            include: [
              {
                model: review,
                attributes: [
                  "id",
                  "book_id",
                  "comment",
                  "nickname",
                  "star",
                  "createdAt",
                ],

                include: [
                  {
                    model: User,
                    attributes: ["id", "nickname", "user_id", "user_img"],
                  },
                ],
                // include: [
                //   {
                //     model: r_review,
                //     attributes: [
                //       "review_id",
                //       "user_id",
                //       "nickname",
                //       "review",
                //       "updatedAt",
                //     ],
                //   },
                // ],
              },
            ],
            where: {
              id: booknum,
            },
          },
        ],
      },
      {
        where: {
          id: Books.user_id,
        },
      }
    );

    // console.log(bookdata);
    // 작가가 쓴 글의 전체 수와 팔로워 수 구하기
    // --------------------------------------------
    // follow 기능 추가되면 추가 해야됨
    // --------------------------------------------
    const authordata = await Books.findOne({
      attributes: [
        [sequelize.fn("count", sequelize.col("writer")), "writebooks"],
      ],
      group: ["writer"],
    });

    // 책에 대한 별점 개수, 총점
    let stardata = await review.findAll({
      attributes: [
        "star",
        [sequelize.fn("count", sequelize.col("star")), "starCnt"],
        [sequelize.fn("sum", sequelize.col("star")), "starSum"],
      ],
      group: ["star"],
      order: [["star", "DESC"]],
      where: {
        book_id: booknum,
      },
      raw: true,
    });

    const reviewdata = await review.findAll({
      include: [
        {
          model: r_review,
          include: [{ model: User }],
        },
      ],
      where: {
        book_id: booknum,
      },
    });
    if (req.decoded?.id) {
      // 로그인한 유저의 id
      const tempuser_id = req.decoded.id;
      // 로그인한 유저의 정보 가져오기
      const userdata = await User.findOne({ where: { id: tempuser_id } });
      res.json({ bookdata, userdata, stardata, authordata, reviewdata });
    }

    res.json({ bookdata, stardata, authordata, reviewdata });
  } catch (error) {
    console.error(error);
  }
};

// 작성된 리뷰 저장
exports.insertReview = async (req, res) => {
  // console.log("exports.insertReview");
  // console.log(req.decoded);
  const { nickname, id } = req.decoded;
  const { book_id, star, comment } = req.body;
  console.log("const { book_id, star, comment } = req.body;");
  console.log(req.body);
  try {
    await review.create({
      book_id,
      nickname,
      comment,
      star,
      user_id: id,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.insertReReview = async (req, res) => {
  // console.log("insertReReview");
  // console.log(req);
  const { nickname, review, user_id, review_id } = req.body;
  try {
    await r_review.create({ nickname, review, user_id, review_id });
  } catch (error) {
    console.error(error);
  }
};

exports.checksadd = async(req,res)=>{

  try {
    
    const {user_id} = req.decoded;
    const userdata = await User.findOne({
      where : {user_id},
      raw:true,
    })
   
    let tz;
    console.log("userdata-------------------")
    console.log(userdata.checks);
    if(userdata.checks == ""){
      console.log("true");
    }
    console.log("userdata-----------------")
    if(userdata.checks==""){
      tz = req.params.id;
    }
    else{
      tz = userdata.checks+","+req.params.id
    }
    await User.update({
      checks : tz,
    },{where : {user_id}})

  } catch (error) {
    console.log("view컨트롤러 checks에서 오류남"+error);
  }
}

exports.checksdel = async(req,res)=>{

  try {
    
    const {user_id} = req.decoded;
    const userdata = await User.findOne({
      where : {user_id},
      raw:true,
    })

    console.log(userdata.checks);
    const checksstr = userdata.checks;
    const splitchecksstr = checksstr.split(",");
    
    const result = splitchecksstr.filter(num => num!=req.params.id);

    console.log("----------------result")
    console.log(splitchecksstr);
    console.log(result)
    console.log("----------------result")
    const result2 = result.join();
    console.log(result2);

    await User.update({
      checks : result2,
    },{where : {user_id}})
    
   
    // let tz;
    // console.log("userdata-------------------")
    // console.log(userdata.checks);
    // if(userdata.checks == ""){
    //   console.log("true");
    // }
    // console.log("userdata-----------------")
    // if(userdata.checks==""){
    //   tz = req.params.id;
    // }
    // else{
    //   tz = userdata.checks+","+req.params.id
    // }
    

  } catch (error) {
    console.log("view컨트롤러 checks에서 오류남"+error);
  }
}
exports.userchecks = async(req,res) =>{
  try {
    const {user_id} =req.decoded;

    const data = await User.findOne({
      where :{user_id},
      raw:true,
    })

    console.log(data);
    res.json(data);
  } catch (error) {
    console.log("view 컨트롤러 userchecks 에서 오류남"+ error);
  }
}

exports.viewcnt = async(req,res)=>{
  console.log("-------------------------req.params.id");

  console.log(req.params.id);
  console.log("-------------------------req.params.id");
  try {
    const data = await Books.findOne({
      where :{
        id : req.params.id,
      }, raw : true,
    })

    console.log(data);
    console.log(data.viewcnt);
    
    await Books.update({
      viewcnt : data.viewcnt+1,

      
    },{
      where :{
        id : req.params.id,
      }
    })
  } catch (error) {
    console.log("viewcnt 컨트롤러에서 오류"+error);
  }
}