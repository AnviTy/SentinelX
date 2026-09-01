const express = require("express");
const router = express.Router();
const { enrichEvent } = require("../services/enrichmentService");
const { getSysmonEvents } = require("../services/sysmonService");
const { analyzeEvent } = require("../services/detectionService");
const { saveAlert } = require("../services/alertService");
const { calculateRiskScore } = require("../services/riskScoreService");
router.get("/events", async (req, res) => {
  console.log("🔥 /events ROUTE CALLED");
  try {
    const events = await getSysmonEvents();

    const analyzedEvents = [];

console.log(
  "EVENT ID COUNTS:",
  events.reduce((acc, e) => {
    acc[e.eventId] = (acc[e.eventId] || 0) + 1;
    return acc;
  }, {})
);

const processEvents = events.filter(e => e.eventId === "1");

console.log("PROCESS CREATE EVENTS:", processEvents.length);

processEvents.slice(0, 5).forEach(e => {
  console.log("PROCESS EVENT:", {
    eventId: e.eventId,
    image: e.Image,
    commandLine: e.CommandLine
  });
});

    for (const event of events) {
      console.log("EVENT ID:", event.eventId, typeof event.eventId);
console.log("COMMAND:", event.CommandLine);

      const detection = analyzeEvent(event);
console.log("EVENT RECORD ID:", event.eventRecordId);
console.log("EVENT ID:", event.eventId);
console.log("Detection result:", detection);
      let savedAlert = null;

      if (detection.isAlert) {

    const vtResult = await enrichEvent(event);
    const riskScore = calculateRiskScore(detection, vtResult);
    console.log("CALCULATED RISK SCORE:", riskScore);
    
    savedAlert = await saveAlert(
        event,
        detection,
        vtResult,
        riskScore
    );

}

      analyzedEvents.push({
        ...event,
        detection,
        savedAlert
      });
    }

    res.json({
      success: true,
      events: analyzedEvents
    });

  } catch (error) {
    console.error("Failed to read Sysmon:", error);

    res.status(500).json({
      success: false,
      message: "Failed to read Sysmon events",
      error: error.message
    });
  }
});

module.exports = router;