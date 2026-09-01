export const mitreTechniques = {
  T1003: {
    name: "Credential Dumping",
    tactic: "Credential Access",
    description:
      "Attackers attempt to dump credentials from the LSASS process or other credential stores."
  },

  T1059: {
    name: "Command and Scripting Interpreter",
    tactic: "Execution",
    description:
      "Attackers execute malicious commands using PowerShell, CMD or other scripting languages."
  },

  T1110: {
    name: "Brute Force",
    tactic: "Credential Access",
    description:
      "Attackers attempt to gain access by repeatedly guessing passwords."
  },

  "T1562.001": {
    name: "Impair Defenses: Disable or Modify Tools",
    tactic: "Defense Evasion",
    description:
      "Attackers may attempt to disable, modify, or interfere with security tools and defensive controls."
  }
};