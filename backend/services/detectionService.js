const { mitreMappings } = require("../data/mitreMappings");
function analyzeEvent(event) {
  if (event.eventId === "1") {
  console.log("=== PROCESS CREATE ===");
  console.log("Image:", event.Image);
  console.log("CommandLine:", event.CommandLine);
}


  if (event.eventId === "1") {

    const commandLine = (event.CommandLine || "").toLowerCase();
    console.log("Checking command:", commandLine);
    // PowerShell detection
    if (
      commandLine.includes("powershell") &&
      (
        commandLine.includes("-enc") ||
        commandLine.includes("encodedcommand") ||
        commandLine.includes("invoke-expression") ||
        commandLine.includes("iex")
      )
    ) {
      return {
        isAlert: true,
        severity: "HIGH",
        ruleId: 200501,
        ruleName: "Suspicious PowerShell Execution",
        mitreId: "T1059.001"
      };
    }

    if (
  commandLine.includes("taskkill")
) {
  console.log("TASKKILL RULE MATCHED!");

  return {
    isAlert: true,
    severity: "MEDIUM",
    ruleId: 200502,
    ruleName: "Suspicious Taskkill Execution",
    mitreId: "T1562.001"
  };
}
    
  }

  return {
    isAlert: false
  };
}

module.exports = {
  analyzeEvent
};