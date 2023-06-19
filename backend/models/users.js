const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models");

class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_img: {
          type: DataTypes.STRING,
          defaultValue: "/img/basic.png",
        },

        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        user_pw: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        gender: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        role: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        grade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        checks: {
          type: DataTypes.STRING,
        },
        email :{
          type: DataTypes.STRING,
        },
        auth :{
          type : DataTypes.STRING,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Users",
        tableName: "users",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static assicoate(db) {
    db.User.hasMany(db.Books, { foreignKey: "user_id", sourceKey: "id" });
    db.User.hasMany(db.Chat, { foreignKey: "chat_id", sourceKey: "id" });
    db.User.hasMany(db.review, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
    db.User.hasMany(db.r_review, {
      foreignKey: "user_id",
      sourceKey: "id",
    });
  }
}

module.exports = User;
