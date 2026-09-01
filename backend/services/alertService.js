const pool = require("../database/database");

async function saveAlert(event, detection, vtResult, riskScore) {

  const query = `
    INSERT INTO alerts (
      event_record_id,
      timestamp,
      severity,
      rule_id,
      rule_name,
      agent_name,
      source_ip,
      mitre_id,
      status,
      vt_found,
      vt_malicious,
      vt_suspicious,
      vt_harmless,
      vt_undetected,
      risk_score,
      command_line,
      image,
      parent_image,
      parent_command_line,
      user_name,
      process_id
    )
    VALUES (
      $1,$2,$3,$4,$5,$6,$7,$8,
      $9,$10,$11,$12,$13,$14,$15,
      $16,$17,$18,$19,$20,$21
    )
    ON CONFLICT (event_record_id)
    WHERE event_record_id IS NOT NULL
    DO NOTHING
    RETURNING *;
  `;

  const values = [
    event.eventRecordId,
    event.timestamp,
    detection.severity,
    detection.ruleId,
    detection.ruleName,
    event.computer,
    event.SourceIp || null,
    detection.mitreId,
    "New",

    vtResult.found,
    vtResult.malicious,
    vtResult.suspicious,
    vtResult.harmless,
    vtResult.undetected,

    riskScore,

    // Sysmon execution evidence
    event.CommandLine || null,
    event.Image || null,
    event.ParentImage || null,
    event.ParentCommandLine || null,
    event.User || null,
    event.ProcessId || null
  ];

  const result = await pool.query(query, values);

  return result.rows[0] || null;
}

module.exports = {
  saveAlert
};