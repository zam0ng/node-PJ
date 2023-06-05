const { DataTypes, Model } = require("sequelize");
const { sequelize } = require("../models");

class Books extends Model {
  static init(sequelize) {
    return super.init(
      {
        img: {
          type: DataTypes.STRING,
          allowNull : false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        writer :{
            type: DataTypes.STRING,
            allowNull : false,
        },
        content : {
            type: DataTypes.TEXT,
            allowNull : false,
        },
        genre : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        page : {
            type: DataTypes.INTEGER,
            allowNull : false,
        },
        publish : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        accept: {
            type: DataTypes.STRING,
            defaultValue : "0",
        },
        reject: {
            type: DataTypes.STRING,
           
        },
        user_id :{
            type: DataTypes.INTEGER,
            allowNull : false,
        }
      },
      {
        sequelize,
        underscored: false,
        timestamps: true,
        modelName: "Books",
        tableName: "books",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static assicoate(db) {
    db.Books.belongsTo(db.User,{foreignKey:"user_id",targetKey: "id"});
    db.Books.hasMany(db.review,{foreignKey:"books_id",sourceKey:"id"});
    
  }
}

module.exports = Books;
