import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { playbooks } from "../data/playbooks";
import { evaluatePlaybook } from "../utils/playbookEngine";
function AlertDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const alert = location.state?.alert;
  const playbook = playbooks[alert?.rule_name];
  const evaluation = evaluatePlaybook(alert, null, null);

  const [automationLogs, setAutomationLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  useEffect(() => {
  if (!alert?.id) return;

  fetch(`http://localhost:5000/api/alerts/${alert.id}/automation`)
    .then((res) => res.json())
    .then((data) => {
      setAutomationLogs(data);
      setLoadingLogs(false);
    })
    .catch((error) => {
      console.error("Failed to load automation logs:", error);
      setLoadingLogs(false);
    });
}, [alert?.id]);
  if (!alert) {
    return (
      <div className="text-white">
        <h1 className="text-2xl font-bold">Alert not found</h1>

        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="text-white space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-500 text-sm uppercase tracking-wider">
            Security Alert
          </p>

          <h1 className="text-3xl font-bold mt-2">
            {alert.rule_name}
          </h1>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-[#111318] border border-slate-800 rounded-xl p-5">
          <p className="text-slate-500 text-sm">Severity</p>
          <p className="text-xl font-bold mt-2">
            {alert.severity}
          </p>
        </div>

        <div className="bg-[#111318] border border-slate-800 rounded-xl p-5">
          <p className="text-slate-500 text-sm">Risk Score</p>
          <p className="text-xl font-bold mt-2">
            {alert.risk_score}
          </p>
        </div>

        <div className="bg-[#111318] border border-slate-800 rounded-xl p-5">
          <p className="text-slate-500 text-sm">MITRE Technique</p>
          <p className="text-xl font-bold mt-2">
            {alert.mitre_id || "N/A"}
          </p>
        </div>

        <div className="bg-[#111318] border border-slate-800 rounded-xl p-5">
          <p className="text-slate-500 text-sm">Status</p>
          <p className="text-xl font-bold mt-2">
            {alert.status}
          </p>
        </div>

      </div>

      <div className="bg-[#111318] border border-slate-800 rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-5">
          Alert Information
        </h2>

        <div className="grid grid-cols-2 gap-5 text-sm">

          <div>
            <p className="text-slate-500">Alert ID</p>
            <p className="mt-1">{alert.id}</p>
          </div>

          <div>
            <p className="text-slate-500">Rule ID</p>
            <p className="mt-1">{alert.rule_id}</p>
          </div>

          <div>
            <p className="text-slate-500">Agent</p>
            <p className="mt-1">{alert.agent_name}</p>
          </div>

          <div>
            <p className="text-slate-500">Source IP</p>
            <p className="mt-1">{alert.source_ip || "N/A"}</p>
          </div>

          <div>
            <p className="text-slate-500">Timestamp</p>
            <p className="mt-1">{alert.timestamp}</p>
          </div>

          <div>
            <p className="text-slate-500">VirusTotal</p>
            <p className="mt-1">
              {alert.vt_found ? "Hash Found" : "Not Found"}
            </p>
          </div>

        </div>

      </div>
      <div className="bg-[#111318] border border-slate-800 rounded-xl p-6">

  <h2 className="text-xl font-semibold mb-5">
    Execution Evidence
  </h2>

  <div className="space-y-5">

    <div>
      <p className="text-slate-500 text-sm">
        Process Image
      </p>

      <p className="mt-2 text-cyan-300 font-mono text-sm break-all">
        {alert.image || "N/A"}
      </p>
    </div>

    <div>
      <p className="text-slate-500 text-sm">
        Command Line
      </p>

      <p className="mt-2 text-yellow-300 font-mono text-sm break-all">
        {alert.command_line || "N/A"}
      </p>
    </div>

    <div>
      <p className="text-slate-500 text-sm">
        Parent Process
      </p>

      <p className="mt-2 text-slate-300 font-mono text-sm break-all">
        {alert.parent_image || "N/A"}
      </p>
    </div>

    <div>
      <p className="text-slate-500 text-sm">
        Parent Command Line
      </p>

      <p className="mt-2 text-slate-300 font-mono text-sm break-all">
        {alert.parent_command_line || "N/A"}
      </p>
    </div>

    <div className="grid grid-cols-2 gap-5">

      <div>
        <p className="text-slate-500 text-sm">
          User
        </p>

        <p className="mt-2 text-white font-mono text-sm">
          {alert.user_name || "N/A"}
        </p>
      </div>

      <div>
        <p className="text-slate-500 text-sm">
          Process ID
        </p>

        <p className="mt-2 text-white font-mono text-sm">
          {alert.process_id || "N/A"}
        </p>
      </div>

    </div>

  </div>

</div>
  {/* AUTOMATION EXPLAINABILITY */}

{playbook && (
  <div className="bg-[#111318] border border-slate-800 rounded-xl p-6">

    <div className="flex items-center justify-between mb-6">

      <div>
        <h2 className="text-xl font-semibold">
          Automation Explainability
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Why SentinelX selected this response playbook
        </p>
      </div>

      <span className="px-3 py-1 rounded-md bg-cyan-500/10 text-cyan-400 text-xs">
        Decision Trace
      </span>

    </div>


    {/* ALERT */}
    <div className="border border-slate-800 rounded-lg p-5">

      <p className="text-slate-500 text-xs uppercase tracking-wider">
        01 · Alert Trigger
      </p>

      <p className="text-white font-semibold mt-2">
        {alert.rule_name}
      </p>

      <p className="text-slate-400 text-sm mt-1">
        Severity: {alert.severity}
      </p>

    </div>


    <div className="text-center text-slate-600 py-3">
      ↓
    </div>


    {/* CONDITIONS */}
    <div className="border border-slate-800 rounded-lg p-5">

      <p className="text-slate-500 text-xs uppercase tracking-wider">
        02 · Conditions Evaluated
      </p>

      <div className="mt-4 space-y-3">

        {evaluation.results.map((result, index) => (

          <div
            key={index}
            className="flex items-center justify-between bg-black/20 rounded-lg px-4 py-3"
          >

            <span className="text-sm text-slate-300">
              {result.label}
            </span>

            <span
              className={
                result.matched
                  ? "text-emerald-400 text-sm font-semibold"
                  : "text-red-400 text-sm font-semibold"
              }
            >
              {result.matched ? "✓ Matched" : "✕ Not Matched"}
            </span>

          </div>

        ))}

      </div>

    </div>


    <div className="text-center text-slate-600 py-3">
      ↓
    </div>


    {/* PLAYBOOK */}
    <div className="border border-cyan-900/50 rounded-lg p-5">

      <p className="text-slate-500 text-xs uppercase tracking-wider">
        03 · Playbook Selected
      </p>

      <p className="text-cyan-400 font-semibold text-lg mt-2">
        {playbook.name}
      </p>

      <p className="text-slate-400 text-sm mt-2">
        {evaluation.execute
          ? "All required conditions were satisfied."
          : "Required conditions were not satisfied."}
      </p>

    </div>


    <div className="text-center text-slate-600 py-3">
      ↓
    </div>


    {/* ACTIONS */}
    <div className="border border-slate-800 rounded-lg p-5">

      <p className="text-slate-500 text-xs uppercase tracking-wider">
        04 · Response Actions
      </p>

      <div className="mt-4 space-y-3">

        {playbook.actions.map((action, index) => (

          <div
            key={index}
            className="flex items-center gap-3 text-sm text-slate-300"
          >

            <span className="text-emerald-400">
              ✓
            </span>

            {action}

          </div>

        ))}

      </div>

    </div>

  </div>
)}  
{/* AUTOMATION EXECUTION HISTORY */}

<div className="bg-[#111318] border border-slate-800 rounded-xl overflow-hidden">

  <div className="px-6 py-5 border-b border-slate-800">
    <h2 className="text-xl font-semibold">
      Automation Execution History
    </h2>

    <p className="text-slate-500 text-sm mt-1">
      Recorded actions performed by SentinelX automation
    </p>
  </div>

  <div className="p-5">

    {loadingLogs ? (
      <p className="text-slate-500 text-sm">
        Loading automation history...
      </p>
    ) : automationLogs.length === 0 ? (
      <p className="text-slate-500 text-sm">
        No automation executions recorded for this alert.
      </p>
    ) : (
      <div className="space-y-3">

        {automationLogs.map((log) => (

          <div
            key={log.id}
            className="border border-slate-800 rounded-lg bg-[#0d0f12] p-4"
          >

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Trigger
                </p>

                <p className="text-slate-300 text-sm mt-1">
                  {log.trigger_reason}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Decision
                </p>

                <p className="text-slate-300 text-sm mt-1">
                  {log.decision}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Action
                </p>

                <p className="text-cyan-400 text-sm mt-1">
                  {log.action}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Result
                </p>

                <p className="text-emerald-400 text-sm font-semibold mt-1">
                  ✓ {log.result}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Risk Score
                </p>

                <p className="text-white text-sm font-semibold mt-1">
                  {log.risk_score}
                </p>
              </div>

              <div>
                <p className="text-slate-500 text-xs uppercase">
                  Executed At
                </p>

                <p className="text-slate-300 text-sm mt-1">
                  {log.executed_at}
                </p>
              </div>

            </div>

          </div>

        ))}

      </div>
    )}

  </div>

</div>

    </div>
  );
}

export default AlertDetails;