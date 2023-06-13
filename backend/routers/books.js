const router = require("express").Router();
const {createBooks,UserUpload} = require("../controllers/booksContoller");
const { Upload } = require("../img");
const {islogin2} =require("../controllers/islogin");

// router.get('/',createBooks)
router.post('/',Upload.single("upload"),islogin2,UserUpload)


module.exports = router
