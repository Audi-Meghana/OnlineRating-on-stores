const router = require("express").Router();
const auth = require("../middlewares/authMiddleware");
const ratingCtrl = require("../controllers/ratingController");

router.post("/store/:storeId", auth(), ratingCtrl.addOrUpdateRating);

// for owner ratings page
router.get("/owner/all", auth("store_owner"), ratingCtrl.getRatingsForOwner);

module.exports = router;
