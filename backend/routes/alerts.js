const express = require("express");
const router = express.Router();

const { getAlerts,
    createAlert,
    updateAlertStatus,
    getAutomationLogs,
 } = require("../controllers/alertsController");

router.get("/", getAlerts);
router.post("/", createAlert);
router.put("/:id", updateAlertStatus);
router.get("/:id/automation", getAutomationLogs);
module.exports = router;