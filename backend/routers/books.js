const router = require("express").Router();
const {createBooks,UserUpload} = require("../controllers/booksContoller");
const { Upload } = require("../img");

// router.get('/',createBooks)
router.post('/',Upload.single("upload"),UserUpload)


module.exports = router
