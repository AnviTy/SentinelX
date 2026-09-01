export const playbooks = {
  "Mimikatz Detected": {
    name: "Credential Investigation",

    conditions: [
      "Severity is Critical",
      "MITRE tactic is Credential Access",
      "Threat reputation is Suspicious"
    ],

    actions: [
      "Assign incident to SOC Analyst",
      "Collect host information",
      "Recommend endpoint isolation",
      "Start credential compromise investigation"
    ]
  },

  "Encoded PowerShell Command": {
    name: "PowerShell Investigation",

    conditions: [
      "Encoded PowerShell detected",
      "Execution tactic identified"
    ],

    actions: [
      "Retrieve PowerShell command",
      "Analyze parent process",
      "Review execution history"
    ]
  },

  "Multiple Failed Login Attempts": {
    name: "Brute Force Investigation",

    conditions: [
      "Multiple failed logins",
      "Brute Force technique detected"
    ],

    actions: [
      "Review authentication logs",
      "Check account activity",
      "Recommend temporary IP block"
    ]
  },
    "Suspicious PowerShell Execution": {
    name: "PowerShell Threat Response",

    conditions: [
      "PowerShell execution detected",
      "Encoded or suspicious execution technique detected",
      "Severity is High"
    ],

    actions: [
      "Review PowerShell command line",
      "Analyze parent process",
      "Decode suspicious content",
      "Verify whether execution was legitimate"
    ]
  },

  "Suspicious Taskkill Execution": {
    name: "Process Termination Investigation",

    conditions: [
      "Taskkill execution detected",
      "Process termination activity identified"
    ],

    actions: [
      "Identify the terminated process",
      "Analyze the initiating user",
      "Review the parent process",
      "Verify whether termination was authorized"
    ]
  }
};