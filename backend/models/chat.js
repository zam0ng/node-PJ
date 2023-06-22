const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models");

class Chat extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        confirm :{
          type:DataTypes.INTEGER,
          defaultValue : "0"
        }
      },
      {
        sequelize,
        underscored: true,
        timestamps: true,
        modelName: "Chat",
        tableName: "chat",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static assicoate(db) {
    db.Chat.belongsTo(db.User, { foreignKey: "chat_id", targetKey: "id" });
  }
}

module.exports = Chat;

// 실시간 채팅
// 특정 유저가 채팅을 시작하고 부터 유저와 운영자간의 대화내용을 가져옴
// -> 시간 값만 있다보니 중간에 다른 유저에 대한 답변을 운영자가 할경우 그 시간대 사이에 있는 운영자의 대화가 모두 가져와 지므로 다른 유저에게 답변한 대화 내용이 불러와짐
// -> 특정유저와 운영자를 특정해줄 컬럼이 필요할듯

// select *
// from test2.chat
// where created_at >= (select min(created_at)
// 	from test2.chat
// 	where chat_id = 2
// 	limit 1)
// and user_name IN ("test2","admin")
// and chat_id = 2
// order by created_at;
