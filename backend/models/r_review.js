const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models");

class r_review extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
        },
        review: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "r_review",
        tableName: "r_review",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static assicoate(db) {
    db.r_review.belongsTo(db.review, {
      foreignKey: "review_id",
      targetKey: "id",
    });
  }
}

module.exports = r_review;
