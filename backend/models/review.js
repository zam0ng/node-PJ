const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models");

class review extends Model {
  static init(sequelize) {
    return super.init(
      {
        book_id: {
          type: DataTypes.INTEGER,
        },
        nickname: {
          type: DataTypes.STRING,
        },
        review: {
          type: DataTypes.STRING,
        },
        star: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Review",
        tableName: "review",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static assicoate(db) {
    db.review.hasMany(db.r_review, {
      foreignKey: "review_id",
      sourceKey: "id",
    });
    db.review.belongTo(db.Books, { foreignKey: "books_id", targetKey: "id" });
  }
}

module.exports = review;
