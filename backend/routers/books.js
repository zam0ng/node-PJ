const router = require("express").Router();
const {createBooks,UserUpload} = require("../controllers/booksContoller");
const { Upload } = require("../img");
const {islogin2,islogin} =require("../controllers/islogin");

// router.get('/',createBooks)
router.post('/',Upload.single("upload"),islogin,UserUpload)


module.exports = router
