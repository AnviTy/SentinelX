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
const createAlert = async (req, res) => {

  try {

    const {
      severity,
      rule_id,
      rule_name,
      agent_name,
      source_ip,
      mitre_id,
      status
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO alerts
      (
        timestamp,
        severity,
        rule_id,
        rule_name,
        agent_name,
        source_ip,
        mitre_id,
        status
      )
      VALUES
      (
        NOW(),
        $1,$2,$3,$4,$5,$6,$7
      )
      RETURNING *;
      `,
      [
        severity,
        rule_id,
        rule_name,
        agent_name,
        source_ip,
        mitre_id,
        status
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Failed to create alert"
    });

  }

};
const updateAlertStatus = async (req, res) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `
      UPDATE alerts
      SET status = $1
      WHERE id = $2
      RETURNING *;
      `,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Database Error"
    });

  }

};
const getAutomationLogs = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT *
      FROM automation_logs
      WHERE alert_id = $1
      ORDER BY executed_at DESC;
      `,
      [id]
    );

    res.json(result.rows);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch automation logs"
    });
  }
};

module.exports = {
  getAlerts,
  createAlert,
  updateAlertStatus,
  getAutomationLogs
};