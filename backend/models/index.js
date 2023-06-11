const Sequelize = require("sequelize");
const config = require("../config");
const review = require("./review");
const r_review = require("./r_review");
const User = require("./users");
const Books = require("./books");
const Chat = require("./chat");

const sequelize = new Sequelize(config.dev);

const db = {};
db.sequelize = sequelize;
db.review = review;
db.r_review = r_review;
db.User = User;
db.Books = Books;
db.Chat = Chat;

User.init(sequelize);
Books.init(sequelize);
review.init(sequelize);
r_review.init(sequelize);
Chat.init(sequelize);

User.assicoate(db);
Books.assicoate(db);
review.assicoate(db);
r_review.assicoate(db);
Chat.assicoate(db);

module.exports = db;
