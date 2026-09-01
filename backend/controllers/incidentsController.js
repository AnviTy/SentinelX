const pool = require("../database/database");

const createIncident = async (req, res) => {
  try {
    const { alert_id, title, severity } = req.body;

    const result = await pool.query(
      `INSERT INTO incidents
      (alert_id, title, severity, status, assigned_to)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *`,
      [
        alert_id,
        title,
        severity,
        "Open",
        "SOC Analyst",
      ]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to create incident",
    });
  }
};


const getIncidents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY created_at DESC"
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to fetch incidents",
    });
  }
};


const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE incidents
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to update incident",
    });
  }
};


const assignIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    const result = await pool.query(
      `UPDATE incidents
       SET assigned_to = $1
       WHERE id = $2
       RETURNING *`,
      [assigned_to, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: "Failed to assign incident",
    });
  }
};


module.exports = {
  createIncident,
  getIncidents,
  updateIncidentStatus,
  assignIncident,
};