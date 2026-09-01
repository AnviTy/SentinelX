const express = require("express");

const router = express.Router();

const {
  createIncident,
    getIncidents,
    updateIncidentStatus,
    assignIncident,
} = require("../controllers/incidentsController");

router.post("/", createIncident);
router.get("/", getIncidents);
router.put("/status/:id", updateIncidentStatus);
router.put("/assign/:id", assignIncident);
module.exports = router;
