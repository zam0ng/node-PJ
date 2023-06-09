const router = require("express").Router();
const {allview,conan,horror,fantasy,sorim,game,romance} = require("../controllers/booksview");

router.get("/all",allview);
router.get("/conan",conan);
router.get("/horror",horror);
router.get("/fantasy",fantasy);
router.get("/sorim",sorim);
router.get("/game",game);
router.get("/romance",romance);


module.exports = router;