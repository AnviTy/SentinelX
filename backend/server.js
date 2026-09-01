require("dotenv").config();
const sysmonRoutes = require("./routes/sysmonRoutes");
const cors = require("cors");
const alertsRoute = require("./routes/alerts");
const express = require("express");
const incidentsRoutes = require("./routes/incidents");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("SentinelX Backend is Running 🚀");
});
app.use("/api/alerts", alertsRoute);
app.use("/api/incidents", incidentsRoutes);
app.use("/api/sysmon", sysmonRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});