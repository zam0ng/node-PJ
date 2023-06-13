const { Books, User, review, r_review } = require("../models");
const { sequelize } = require("../models");

// 책번호를 가져와 books의 정보와 작가의 정보를 가져옴
exports.viewInfo = async (req, res) => {
  // 가져온 책의 번호
  const booknum = 1;
  // 로그인한 유저의 id
  const tempuser_id = 8;
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
      raw: true,
    });

    const reviewdata = await review.findAll({
      include: [
        {
          model: r_review,
          include: [{ model: User }],
        },
      ],
    });

    // console.log(reviewdata);
    // users 테이블에 모든 유저의 정보를 가져옴
    // const userAll = await User.findAll();
    // const userAlldata = userAll.map((e) => e.dataValues);
    // // console.log(userAlldata);

    // res.json({ bookdata, userdata, stardata, authordata, userAlldata });

    res.json({ bookdata, userdata, stardata, authordata, reviewdata });
  } catch (error) {
    console.error(error);
  }
};

// 작성된 리뷰 저장
exports.insertReview = async (req, res) => {
  const { book_id, nickname, star, comment, user_id } = req.body;
  try {
    await review.create({
      book_id,
      nickname,
      comment,
      star,
      user_id,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.insertReReview = async (req, res) => {
  const { nickname, review, user_id, review_id } = req.query;
  try {
    await r_review.create({ nickname, review, user_id, review_id });
  } catch (error) {
    console.error(error);
  }
};

exports.Ta = async (req, res) => {
  try {
    const data = await review.findAll({
      include: [{ model: User }],
    });

    res.json(data);

    // 책번호를 가져와 책에 쓴 댓글을 가져옴
    // const test = await sequelize.query(
    //   `SELECT * FROM users A, review B WHERE A.nickname = B.nickname and B.book_id = 49 order by B.createdAt`,
    //   { type: sequelize.QueryTypes.SELECT }
    // );

    // res.json(test);

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
