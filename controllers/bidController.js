const Bid = require("../models/Bid");
const Item = require("../models/Item");

exports.getBidsForItem = async (req, res) => {
  try {
    const bids = await Bid.find({ item_id: req.params.itemId }).sort({
      bid_amount: -1,
    });
    res.json(bids);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.placeBid = async (req, res) => {
  const { bid_amount } = req.body;

  try {
    const item = await Item.findById(req.params.itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (bid_amount <= item.current_price) {
      return res
        .status(400)
        .json({ message: "Bid amount must be higher than the current price" });
    }

    const newBid = new Bid({
      item_id: req.params.itemId,
      user_id: req.user.id,
      bid_amount,
    });

    item.current_price = bid_amount;
    await item.save();
    await newBid.save();

    res.status(201).json(newBid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
