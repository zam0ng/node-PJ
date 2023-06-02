const Sequelize = require("sequelize");
const config = require("../config");
const review = require("./review");
const r_review = require("./r_review");

const sequelize = new Sequelize(config.dev);

const db = {};
db.sequelize = sequelize;
db.review = review;
db.r_review = r_review;

review.init(sequelize);
r_review.init(sequelize);

review.assicoate(db);
r_review.assicoate(db);

module.exports = db;
