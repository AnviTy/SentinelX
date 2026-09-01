import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

import { mitreTechniques } from "../data/mitreTechniques";
import { threatIntel } from "../data/threatIntel";
import { detectionGuidance } from "../data/detectionGuidance";
import { playbooks } from "../data/playbooks";
import { evaluatePlaybook } from "../utils/playbookEngine";
import { useNavigate } from "react-router-dom";
function AlertsTable() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [automationLogs, setAutomationLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();
  const selectedId = searchParams.get("id");

  // Fetch alerts from PostgreSQL through Express
  const fetchAlerts = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/alerts");

      if (!response.ok) {
        throw new Error("Failed to fetch alerts");
      }

      const data = await response.json();

      setAlerts(Array.isArray(data) ? data : []);

      // If an alert was opened through URL
      if (selectedId) {
        const found = data.find(
          (alert) => String(alert.id) === String(selectedId)
        );

        if (found) {
          setSelectedAlert(found);
        }
      }
    } catch (err) {
      console.error("Failed to fetch alerts:", err);
      setError("Unable to load alerts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [selectedId]);

  // Fetch automation history for selected alert
  const fetchAutomationLogs = async (alertId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/alerts/${alertId}/automation`
      );

      if (!response.ok) {
        setAutomationLogs([]);
        return;
      }

      const data = await response.json();

      setAutomationLogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Automation log error:", err);
      setAutomationLogs([]);
    }
  };

  // Select an alert
  const handleSelectAlert = async (alert) => {
    setSelectedAlert(alert);
    setAutomationLogs([]);

    await fetchAutomationLogs(alert.id);
  };

  // Change status
  const updateStatus = async (alertId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/alerts/${alertId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      await fetchAlerts();

      setSelectedAlert((current) =>
        current
          ? {
              ...current,
              status,
            }
          : current
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  // Create incident
  const createIncident = async () => {
    if (!selectedAlert) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/incidents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alert_id: selectedAlert.id,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create incident");
      }

      alert("Incident created successfully.");
    } catch (err) {
      console.error("Incident creation failed:", err);
      alert("Failed to create incident.");
    }
  };

  if (loading) {
    return (
      <div className="mt-10 rounded-2xl border border-slate-800 bg-[#111318] p-8">
        <p className="text-slate-400">Loading alerts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-10 rounded-2xl border border-red-900/40 bg-[#111318] p-8">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 space-y-8">

      {/* ================= ALERT TABLE ================= */}

      <div className="rounded-2xl border border-slate-800 bg-[#111318] shadow-xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-800">
          <h2 className="text-xl font-semibold text-white">
            Security Alerts
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Alerts detected and processed by SentinelX
          </p>
        </div>

        {alerts.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No alerts available.
          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead className="bg-[#17191f]">
                <tr className="text-xs uppercase tracking-wider text-slate-500">

                  <th className="px-6 py-4">
                    ID
                  </th>

                  <th className="px-6 py-4">
                    Rule
                  </th>

                  <th className="px-6 py-4">
                    Severity
                  </th>

                  <th className="px-6 py-4">
                    Risk
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Agent
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">

                {alerts.map((alert) => (

  <tr
    key={alert.id}
    onClick={() => {
      console.log("ALERT CLICKED:", alert);

      navigate(`/alert/${alert.id}`, {
        state: { alert }
      });
    }}
    className="cursor-pointer hover:bg-[#17191f] transition"
  >

                    <td className="px-6 py-5 text-slate-400 text-sm">
                      #{alert.id}
                    </td>

                    <td className="px-6 py-5">

                      <p className="text-white font-medium">
                        {alert.rule_name || "Unknown Rule"}
                      </p>

                      <p className="text-xs text-slate-500 mt-1">
                        MITRE: {alert.mitre_id || "N/A"}
                      </p>

                    </td>

                    <td className="px-6 py-5">
                      <SeverityBadge severity={alert.severity} />
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`font-semibold ${
                          Number(alert.risk_score) >= 70
                            ? "text-red-400"
                            : Number(alert.risk_score) >= 40
                            ? "text-orange-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {alert.risk_score ?? 0}
                      </span>

                    </td>

                    <td className="px-6 py-5">
                      <StatusBadge status={alert.status} />
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-400">
                      {alert.agent_name || "Unknown"}
                    </td>

                    <td className="px-6 py-5">

                      <button
                        onClick={() => handleSelectAlert(alert)}
                        className="
                          rounded-lg
                          border border-indigo-500/40
                          bg-indigo-500/10
                          px-4 py-2
                          text-sm
                          text-indigo-300
                          hover:bg-indigo-500/20
                          transition
                        "
                      >
                        Investigate
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>


      {/* ================= INVESTIGATION PANEL ================= */}

      {selectedAlert && (

        <div className="rounded-2xl border border-slate-800 bg-[#111318] shadow-xl">

          <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">

            <div>

              <p className="text-xs uppercase tracking-wider text-indigo-400">
                Alert Investigation
              </p>

              <h2 className="text-2xl font-semibold text-white mt-1">
                {selectedAlert.rule_name}
              </h2>

            </div>

            <button
              onClick={() => setSelectedAlert(null)}
              className="text-slate-500 hover:text-white text-xl"
            >
              ×
            </button>

          </div>


          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* ALERT DETAILS */}

            <div className="space-y-5">

              <h3 className="text-lg font-semibold text-white">
                Alert Details
              </h3>

              <div className="grid grid-cols-2 gap-4">

                <Detail
                  label="Alert ID"
                  value={`#${selectedAlert.id}`}
                />

                <Detail
                  label="Severity"
                  value={selectedAlert.severity}
                />

                <Detail
                  label="Risk Score"
                  value={selectedAlert.risk_score ?? 0}
                />

                <Detail
                  label="Status"
                  value={selectedAlert.status}
                />

                <Detail
                  label="Agent"
                  value={selectedAlert.agent_name || "N/A"}
                />

                <Detail
                  label="Source IP"
                  value={selectedAlert.source_ip || "N/A"}
                />

                <Detail
                  label="MITRE ID"
                  value={selectedAlert.mitre_id || "N/A"}
                />

                <Detail
                  label="Event Record"
                  value={selectedAlert.event_record_id || "N/A"}
                />

              </div>


              <div className="flex gap-3 pt-3">

                <button
                  onClick={() =>
                    updateStatus(selectedAlert.id, "Investigating")
                  }
                  className="
                    rounded-lg
                    bg-indigo-500
                    px-4 py-2
                    text-sm font-medium
                    text-white
                    hover:bg-indigo-600
                  "
                >
                  Mark Investigating
                </button>

                <button
                  onClick={() =>
                    updateStatus(selectedAlert.id, "Processed")
                  }
                  className="
                    rounded-lg
                    border border-slate-700
                    px-4 py-2
                    text-sm
                    text-slate-300
                    hover:bg-slate-800
                  "
                >
                  Mark Processed
                </button>

                <button
                  onClick={createIncident}
                  className="
                    rounded-lg
                    border border-red-500/30
                    bg-red-500/10
                    px-4 py-2
                    text-sm
                    text-red-300
                    hover:bg-red-500/20
                  "
                >
                  Create Incident
                </button>

              </div>

            </div>


            {/* MITRE + THREAT INTEL */}

            <div className="space-y-6">

              <h3 className="text-lg font-semibold text-white">
                Threat Context
              </h3>

              {(() => {

                const mitre =
                  mitreTechniques[selectedAlert.mitre_id];

                const intel =
                  selectedAlert.source_ip
                    ? threatIntel[selectedAlert.source_ip]
                    : null;

                return (

                  <div className="space-y-4">

                    {/* MITRE */}

                    <div className="rounded-xl border border-slate-800 bg-[#17191f] p-5">

                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        MITRE ATT&CK
                      </p>

                      {mitre ? (

                        <>
                          <h4 className="text-white font-semibold mt-2">
                            {mitre.name}
                          </h4>

                          <p className="text-sm text-indigo-300 mt-1">
                            {selectedAlert.mitre_id} · {mitre.tactic}
                          </p>

                          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
                            {mitre.description}
                          </p>
                        </>

                      ) : (

                        <p className="text-sm text-slate-500 mt-2">
                          No MITRE mapping available for this alert.
                        </p>

                      )}

                    </div>


                    {/* THREAT INTEL */}

                    <div className="rounded-xl border border-slate-800 bg-[#17191f] p-5">

                      <p className="text-xs uppercase tracking-wider text-slate-500">
                        Threat Intelligence
                      </p>

                      {intel ? (

                        <>
                          <h4 className="text-white font-semibold mt-2">
                            {intel.reputation}
                          </h4>

                          <p className="text-sm text-slate-400 mt-1">
                            Confidence: {intel.confidence}%
                          </p>

                          <p className="text-xs text-slate-500 mt-2">
                            Source: {intel.source}
                          </p>
                        </>

                      ) : (

                        <p className="text-sm text-slate-500 mt-2">
                          No external threat-intelligence record available.
                        </p>

                      )}

                    </div>

                  </div>

                );

              })()}

            </div>

          </div>


          {/* ================= DETECTION GUIDANCE ================= */}

          {(() => {

            const guidance =
              detectionGuidance[selectedAlert.rule_name];

            if (!guidance) return null;

            return (

              <div className="mx-6 mb-6 rounded-xl border border-slate-800 bg-[#17191f] p-6">

                <p className="text-xs uppercase tracking-wider text-indigo-400">
                  Detection Guidance
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">

                  <Guidance
                    title="What happened?"
                    text={guidance.explanation}
                  />

                  <Guidance
                    title="Potential impact"
                    text={guidance.impact}
                  />

                  <Guidance
                    title="Recommended response"
                    text={guidance.recommendation}
                  />

                </div>

              </div>

            );

          })()}


          {/* ================= PLAYBOOK ================= */}

          {(() => {

            const playbook =
              playbooks[selectedAlert.rule_name];

            if (!playbook) return null;

            const mitre =
              mitreTechniques[selectedAlert.mitre_id];

            const intel =
              selectedAlert.source_ip
                ? threatIntel[selectedAlert.source_ip]
                : null;

            const evaluation =
              evaluatePlaybook(
                selectedAlert,
                mitre,
                intel
              );

            return (

              <div className="mx-6 mb-6 rounded-xl border border-slate-800 bg-[#17191f] p-6">

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-indigo-400">
                      SOAR Automation
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-1">
                      {playbook.name}
                    </h3>

                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      evaluation.execute
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {evaluation.execute
                      ? "Automation Eligible"
                      : "Automation Not Executed"}
                  </span>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">

                  <div>

                    <p className="text-sm font-medium text-slate-300 mb-3">
                      Decision Logic
                    </p>

                    <div className="space-y-2">

                      {evaluation.results.map((result) => (

                        <div
                          key={result.label}
                          className="flex items-center gap-3 text-sm"
                        >

                          <span
                            className={
                              result.matched
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          >
                            {result.matched ? "✓" : "✕"}
                          </span>

                          <span className="text-slate-400">
                            {result.label}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>


                  <div>

                    <p className="text-sm font-medium text-slate-300 mb-3">
                      Playbook Actions
                    </p>

                    <div className="space-y-2">

                      {playbook.actions.map((action) => (

                        <div
                          key={action}
                          className="text-sm text-slate-400"
                        >
                          • {action}
                        </div>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            );

          })()}


          {/* ================= AUTOMATION LOG ================= */}

          <div className="mx-6 mb-6 rounded-xl border border-slate-800 bg-[#17191f] p-6">

            <p className="text-xs uppercase tracking-wider text-indigo-400">
              Automation Execution Log
            </p>

            {automationLogs.length === 0 ? (

              <p className="text-sm text-slate-500 mt-4">
                No automation execution recorded for this alert.
              </p>

            ) : (

              <div className="mt-5 overflow-x-auto">

                <table className="w-full text-left">

                  <thead>

                    <tr className="text-xs uppercase tracking-wider text-slate-500 border-b border-slate-800">

                      <th className="py-3 pr-4">
                        Trigger
                      </th>

                      <th className="py-3 pr-4">
                        Decision
                      </th>

                      <th className="py-3 pr-4">
                        Action
                      </th>

                      <th className="py-3 pr-4">
                        Result
                      </th>

                    </tr>

                  </thead>

                  <tbody className="divide-y divide-slate-800">

                    {automationLogs.map((log, index) => (
<tr
  key={log.id || index}
>                    

                        <td className="py-4 pr-4 text-sm text-slate-400">
                          {log.trigger_condition || "N/A"}
                        </td>

                        <td className="py-4 pr-4 text-sm text-slate-400">
                          {log.decision || "N/A"}
                        </td>

                        <td className="py-4 pr-4 text-sm text-slate-400">
                          {log.action_taken || "N/A"}
                        </td>

                        <td className="py-4 pr-4">

                          <span
                            className={`text-sm ${
                              String(log.result).toLowerCase() ===
                              "success"
                                ? "text-emerald-400"
                                : "text-slate-400"
                            }`}
                          >
                            {log.result || "N/A"}
                          </span>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
}


/* ================= SMALL COMPONENTS ================= */

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#17191f] p-4">

      <p className="text-xs uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="text-sm text-slate-200 mt-2 break-words">
        {value}
      </p>

    </div>
  );
}


function Guidance({ title, text }) {
  return (
    <div>

      <h4 className="text-sm font-medium text-slate-200">
        {title}
      </h4>

      <p className="text-sm text-slate-400 mt-2 leading-relaxed">
        {text}
      </p>

    </div>
  );
}


export default AlertsTable;