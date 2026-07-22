const alerts = [
  {
    id: 1,
    time: "10:45",
    severity: "Critical",
    rule: "Mimikatz Detected",
    source: "WIN-VM-01",
    status: "Open",
  },
  {
    id: 2,
    time: "10:42",
    severity: "High",
    rule: "PowerShell Execution",
    source: "WIN-VM-01",
    status: "Investigating",
  },
  {
    id: 3,
    time: "10:38",
    severity: "Medium",
    rule: "SSH Brute Force",
    source: "Ubuntu-01",
    status: "Closed",
  },
];

module.exports = alerts;