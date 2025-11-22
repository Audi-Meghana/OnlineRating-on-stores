const router = require("express").Router();
const storeCtrl = require("../controllers/storeController");
const auth = require("../middlewares/authMiddleware");

// -----------------------------------------------
// ADMIN: Add new store
// -----------------------------------------------
router.post("/", auth("admin"), storeCtrl.addStore);

// -----------------------------------------------
// PUBLIC / USER: Get all stores
// -----------------------------------------------
router.get("/", storeCtrl.getStores);

// ===============================================
// ⭐ STORE OWNER: Get store of logged-in owner
// ===============================================
router.get("/my-store/owner", auth("store_owner"), async (req, res) => {
  try {
    const Store = require("../models/store.model");
    const Rating = require("../models/rating.model");

    const ownerId = req.user.id;

    const store = await Store.findOne({ owner: ownerId }).lean();

    if (!store) {
      return res.status(404).json({ message: "Store not found for this owner" });
    }

    const ratings = await Rating.find({ store: store._id });

    let avgRating = 0;
    if (ratings.length > 0) {
      avgRating = ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;
    }

    return res.json({
      id: store._id,
      name: store.name,
      address: store.address,
      avgRating,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------------------
// USER: Get store details
// -----------------------------------------------
router.get("/:id", auth(), storeCtrl.getStoreDetails);

module.exports = router;
