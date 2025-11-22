const router = require("express").Router();
const userCtrl = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.get("/", auth("admin"), userCtrl.getAllUsers);
router.post("/", auth("admin"), userCtrl.addUser);
router.get("/:id", auth("admin"), userCtrl.getUserById);

module.exports = router;
