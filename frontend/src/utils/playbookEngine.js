export function evaluatePlaybook(alert, mitre, intel) {
  const results = [];

  if (alert.rule_name === "Mimikatz Detected") {
    results.push(
      {
        label: "Severity is Critical",
        matched: alert.severity === "Critical",
      },
      {
        label: "MITRE tactic is Credential Access",
        matched: mitre?.tactic === "Credential Access",
      },
      {
        label: "Threat reputation is Suspicious",
        matched: intel?.reputation === "Suspicious",
      }
    );
  }

  else if (alert.rule_name === "Encoded PowerShell Command") {
    results.push(
      {
        label: "Encoded PowerShell detected",
        matched: true,
      },
      {
        label: "Execution tactic identified",
        matched: mitre?.tactic === "Execution",
      }
    );
  }

  else if (alert.rule_name === "Multiple Failed Login Attempts") {
    results.push(
      {
        label: "Multiple failed logins",
        matched: true,
      },
      {
        label: "Brute Force technique detected",
        matched: mitre?.name === "Brute Force",
      }
    );
  }

  else if (alert.rule_name === "Suspicious PowerShell Execution") {
    results.push(
      {
        label: "PowerShell execution detected",
        matched: true,
      },
      {
        label: "Suspicious execution technique detected",
        matched: true,
      },
      {
        label: "Severity is High",
        matched: alert.severity?.toLowerCase() === "high",
      }
    );
  }

  else if (alert.rule_name === "Suspicious Taskkill Execution") {
    results.push(
      {
        label: "Taskkill execution detected",
        matched: true,
      },
      {
        label: "Process termination activity identified",
        matched: true,
      }
    );
  }

  const execute =
    results.length > 0 &&
    results.every((result) => result.matched);

  return {
    results,
    execute,
  };
}