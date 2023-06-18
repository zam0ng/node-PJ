const { Chat, User } = require("../models");

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
