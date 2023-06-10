const { Books, User, review, r_review } = require("../models");
const { sequelize } = require("../models");

// 책번호를 가져와 books의 정보와 작가의 정보를 가져옴
exports.viewInfo = async (req, res) => {
  // 가져온 책의 번호
  const booknum = 49;
  // 로그인한 유저의 id
  const tempuser_id = 14;
  try {
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
                attributes: ["id", "book_id", "comment", "nickname", "star"],
                include: [
                  {
                    model: r_review,
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
    const authordata = await User.findOne(
      {
        attributes: [
          [sequelize.fn("count", sequelize.col("user_id")), "writebooks"],
        ],
        where: { id: bookdata.dataValues.id },
      },
      {
        include: [{ model: Books }],
        group: ["user_id"],
      }
    );

    // 로그인한 유저의 정보 가져오기
    const userdata = await User.findOne({ where: { id: tempuser_id } });

    // 책에 대한 별점 개수, 총점
    let stardata = await review.findAll({
      attributes: [
        "star",
        [sequelize.fn("count", sequelize.col("star")), "starCnt"],
        [sequelize.fn("sum", sequelize.col("star")), "starSum"],
      ],
      group: ["star"],
      order: [["star", "DESC"]],
    });

    stardata = stardata.map((e) => e.dataValues);

    res.json({ bookdata, userdata, stardata, authordata });
  } catch (error) {
    console.error(error);
  }
};

// 작성된 리뷰 저장
exports.insertReview = async (req, res) => {
  const { book_id, nickname, star, comment } = req.body;
  try {
    await review.create({ book_id, nickname, comment, star });
  } catch (error) {
    console.log(error);
  }
};

exports.Ta = async (req, res) => {
  try {
    // 책번호를 가져와 책에 쓴 댓글을 가져옴
    const test = await sequelize.query(
      `SELECT * FROM users A, review B WHERE A.nickname = B.nickname and B.book_id = 49 order by B.createdAt`,
      { type: sequelize.QueryTypes.SELECT }
    );

    res.json(test);

    // const test = await Books.findAll({
    //   include: [{ model: review, where: { book_id: 49 } }],
    // });

    // console.log("test[0].dataValues");
    // console.log(test[0].dataValues.Reviews.Review[0].dataValues);

    // 별점 가져오기
    // const test = await review.findAll({
    //   attributes: [
    //     "star",
    //     [sequelize.fn("count", sequelize.col("star")), "starCnt"],
    //     [sequelize.fn("sum", sequelize.col("star")), "starSum"],
    //   ],
    //   group: ["star"],
    // });
    // const tb = test.map((e) => e.dataValues);
    // console.log(tb);

    // res.json(test);
    // res.json을 두번 쓰면 아래 같은 오류가 남
    // Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  } catch (error) {
    console.error(error);
  }
};
