const { Books, User } = require("../models");

// 책번호를 가져와 books의 정보와 작가의 정보를 가져옴
exports.viewInfo = async (req, res) => {
  // 가져온 책의 번호
  const booknum = 49;
  try {
    const data = await User.findOne(
      {
        include: [
          {
            model: Books,
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

    res.json(data);
  } catch (error) {
    console.error(error);
  }
};
