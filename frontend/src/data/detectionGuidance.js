export const detectionGuidance = {
  "Mimikatz Detected": {
    explanation:
      "Sysmon detected behavior commonly associated with Mimikatz attempting to access LSASS memory.",

    impact:
      "Credentials stored in memory may have been stolen, allowing attackers to move laterally.",

    recommendation:
      "Isolate the endpoint immediately, collect a memory dump, and reset compromised credentials."
  },

  "Encoded PowerShell Command": {
    explanation:
      "A PowerShell process was launched using an encoded command, a technique often used to hide malicious scripts.",

    impact:
      "Attackers frequently use encoded PowerShell to execute malware while avoiding detection.",

    recommendation:
      "Review the decoded command, identify the parent process, and verify whether execution was legitimate."
  },

  "Multiple Failed Login Attempts": {
    explanation:
      "Several authentication failures were detected from the same source within a short period.",

    impact:
      "This may indicate a brute-force password attack against user accounts.",

    recommendation:
      "Check whether the source IP is trusted, monitor the account, and consider temporarily blocking the source."
  },
   "Suspicious PowerShell Execution": {
    explanation:
      "A PowerShell process was detected using an encoded or script-execution technique commonly associated with malicious activity.",

    impact:
      "Attackers can use PowerShell to execute malicious commands while attempting to evade traditional security controls.",

    recommendation:
      "Review the command line, decode any encoded content, identify the parent process, and verify whether the execution was legitimate."
  },

  "Suspicious Taskkill Execution": {
    explanation:
      "The taskkill utility was executed to terminate a process on the endpoint.",

    impact:
      "Attackers may terminate security tools or other processes to disrupt defensive controls before carrying out malicious activity.",

    recommendation:
      "Identify the terminated process, verify the initiating user and parent process, and determine whether the action was authorized."
  }
};
