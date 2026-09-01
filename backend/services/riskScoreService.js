function calculateRiskScore(detection, vtResult) {
  let score = 0;

  // Base score from detection severity
  if (detection.severity === "CRITICAL") {
    score += 50;
  } else if (detection.severity === "HIGH") {
    score += 40;
  } else if (detection.severity === "MEDIUM") {
    score += 25;
  } else if (detection.severity === "LOW") {
    score += 10;
  }

  // VirusTotal enrichment
  if (vtResult?.found) {
    score += (vtResult.malicious || 0) * 2;
    score += vtResult.suspicious || 0;
  }

  // Keep score between 0 and 100
  return Math.min(score, 100);
}

module.exports = {
  calculateRiskScore
};