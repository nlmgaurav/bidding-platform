const pool = require("../database");

const notifyUsers = async (itemId, bid) => {
  const result = await pool.query("SELECT * FROM items WHERE id = $1", [
    itemId,
  ]);
  const item = result.rows[0];
  const ownerResult = await pool.query("SELECT * FROM users WHERE id = $1", [
    item.user_id,
  ]);
  const owner = ownerResult.rows[0];

  await pool.query(
    "INSERT INTO notifications (user_id, message) VALUES ($1, $2)",
    [owner.id, `Your item ${item.name} received a new bid of ${bid.bid_amount}`]
  );
};

module.exports = {
  notifyUsers,
};
