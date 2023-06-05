const router = require("express").Router();
const {createBooks} = require("../controllers/booksContoller");

router.get('/',createBooks)


module.exports = router