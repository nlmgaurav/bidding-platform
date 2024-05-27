const Item = require("../models/Item");

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;

  try {
    const newItem = new Item({
      name,
      description,
      starting_price,
      current_price: starting_price,
      end_time,
      user_id: req.user.id,
    });

    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateItem = async (req, res) => {
  const { name, description, starting_price, end_time } = req.body;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the user updating the item is the owner
    if (item.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, starting_price, end_time } },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Check if the user deleting the item is the owner
    if (item.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: "User not authorized" });
    }

    await Item.findByIdAndRemove(req.params.id);
    res.json({ message: "Item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
