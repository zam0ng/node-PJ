const { Books, User } = require("../models");

exports.UserUpload = async (req, res) => {
  try {
    //console.log(req);
    const { nickname, user_id, id } = req.decoded;
    const { title, content, genre, page, price, publish } = req.body;

    await Books.create({
      img: req.file.path,
      title: title,
      writer: nickname,
      content: content,
      genre: genre,
      page: page,
      price: price,
      publish: publish,
      accept: 0,
      reject: 0,
      user_id: id,
    });
    res.send("여기 완!");
  } catch (error) {
    //console.log(error);
  }
};

// 책 표지 이미지
exports.ImgLink = async (req, res) => {
  try {
    const data = await Books.findOne({ where: { id: 4 } });
    res.json(data);
  } catch (error) {
    //console.log(error);
    res.status(500).send("Internal Server Error"); // 오류 발생 시 500 상태 코드와 함께 오류 메시지를 응답
  }
};
