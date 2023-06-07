const router = require("express").Router();
const {UserUpload,ImgLink}=require("../controllers/booksContoller")
const {Upload} = require("../img");

router.post("/",Upload.single("upload"),UserUpload)
router.get('/view',ImgLink)
module.exports = router