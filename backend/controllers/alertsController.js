const pool = require("../database/database");

const getAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM alerts ORDER BY timestamp DESC"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database Error",
    });
  }
};

module.exports = {
  getAlerts,
};