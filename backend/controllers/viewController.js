const { raw } = require("express");
const { Books, User, review, r_review } = require("../models");
const { sequelize } = require("../models");
const url = require("url");
const e = require("express");

// 책번호를 가져와 books의 정보와 작가의 정보를 가져옴
exports.viewInfo = async (req, res) => {
  try {
    // 가져온 책의 번호
    let booknum = req.params.id;

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
              "price",
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
    const stardata = await review.findAll({
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
  const { nickname, id } = req.decoded;
  const { book_id, star, comment } = req.body;
  // console.log("const { book_id, star, comment } = req.body;");
  // console.log(req.body);
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
  const { nickname, id } = req.decoded;
  const { review, review_id } = req.body;
  try {
    await r_review.create({ nickname, review, user_id: id, review_id });
  } catch (error) {
    console.error(error);
  }
};

exports.checksadd = async (req, res) => {
  try {
    const { user_id } = req.decoded;
    const userdata = await User.findOne({
      where: { user_id },
      raw: true,
    });

    let tz;
    if (userdata.checks == "") {
      console.log("true");
    }
    if (userdata.checks == "") {
      tz = req.params.id;
    } else {
      tz = userdata.checks + "," + req.params.id;
    }
    await User.update(
      {
        checks: tz,
      },
      { where: { user_id } }
    );
  } catch (error) {
    console.log("view컨트롤러 checks에서 오류남" + error);
  }
};

exports.checksdel = async (req, res) => {
  try {
    const { user_id } = req.decoded;
    const userdata = await User.findOne({
      where: { user_id },
      raw: true,
    });

    const checksstr = userdata.checks;
    const splitchecksstr = checksstr.split(",");

    const result = splitchecksstr.filter((num) => num != req.params.id);

    const result2 = result.join();

    await User.update(
      {
        checks: result2,
      },
      { where: { user_id } }
    );
  } catch (error) {
    console.log("view컨트롤러 checks에서 오류남" + error);
  }
};
exports.userchecks = async (req, res) => {
  try {
    const { user_id } = req.decoded;

    const data = await User.findOne({
      where: { user_id },
      raw: true,
    });

    res.json(data);
  } catch (error) {
    console.log("view 컨트롤러 userchecks 에서 오류남" + error);
  }
};

exports.viewcnt = async (req, res) => {
  try {
    const data = await Books.findOne({
      where: {
        id: req.params.id,
      },
      raw: true,
    });

    await Books.update(
      {
        viewcnt: data.viewcnt + 1,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.send();
  } catch (error) {
    console.log("viewcnt 컨트롤러에서 오류" + error);
  }
};

exports.followadd = async (req, res) => {
  try {
    const { user_id } = req.decoded;
    const data = await User.findOne({ where: { user_id: user_id }, raw: true });
    const as = data.following;
    if (data.followig == "") {
      // User.update({following : },{ where: {user_id}});
    }
    const qw = as.split(",");
    const data2 = await User.findAll({ where: { id: qw } });

    res.json(data2);
  } catch (error) {
    console.log("여기 followadd error임");
    console.log(error);
  }
};

exports.followdel = async (req, res) => {
  try {
    req.parmas;
    // const {user_id}=req.decoded;
    // const data = await User.findOne({ where : {user_id},raw:true})
    // console.log("----------여기 followdel")
    // console.log(data.following)
    // const followstr = data.following;
    // const tr = followstr.split(",");
    // const result = tr.filter(num => num!=req.params.id)
    // console.log("----------------result")
    // console.log(tr);
    // console.log(result)
    // console.log("----------------result")
    // const result2 = result.join();
    // await User.update({
    //   following : result2},{where:{user_id}})
  } catch (error) {
    console.log("followdel에서 오류남" + error);
  }
};
exports.userfollow = async (req, res) => {
  try {
    const { user_id } = req.decoded;

    const data = await User.findOne({
      where: { user_id },
      raw: true,
    });

    res.json(data);
  } catch (error) {
    console.log("view 컨트롤러userfollow 에서 오류남" + error);
  }
};

exports.howprice = async(req,res) =>{

  try {
      const {id}= req.query;
      console.log(id);

      const data = await Books.findOne({
        where :{
          id : id,
        },raw :true,
      })
      
      console.log(data.price);
      res.json(data.price);

  } catch (error) {
    console.log("view컨트롤러 howprice 에 오류남" +error); 
  }
}

exports.usercnt = async(req,res) =>{

  try {
    const {id}= req.query;
      console.log(id);
      // 책번호 
    const data = await User.findAll({
      attributes :["following"],

      where :{
        following: {
          [Op.ne]: null, 
          [Op.like]: `%${id}%`
        },raw:true,
      }
    })

    console.log(data);
    console.log(data.length);
  } catch (error) {
    console.log("view컨트롤러 usercnt 에 오류남" +error); 
  }
}
