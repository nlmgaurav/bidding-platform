const express = require("express");
const { getBidsForItem, placeBid } = require("../controllers/bidController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:itemId", getBidsForItem);
router.post("/:itemId", authMiddleware, placeBid);

module.exports = router;
