import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";
import { useEffect, useState } from "react";
function AlertsTable() {
    const [alerts, setAlerts] = useState([]);
    useEffect(() => {
  fetch("http://localhost:5000/api/alerts")
    .then((response) => response.json())
    .then((data) => {
      setAlerts(data);
    })
    .catch((error) => {
      console.error("Error fetching alerts:", error);
    });
}, []);

   return (
  <div className="mt-10 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

    <h2 className="text-xl font-semibold text-white p-6 border-b border-slate-700">
      Recent Alerts
    </h2>

    <table className="w-full text-left">

      <thead className="bg-slate-900 text-slate-300">

        <tr>
          <th className="p-4">Time</th>
          <th className="p-4">Severity</th>
          <th className="p-4">Rule</th>
          <th className="p-4">Source</th>
          <th className="p-4">Status</th>
        </tr>

      </thead>

      <tbody>
         {alerts.map((alert) => (

    <tr
      key={alert.id}
      className="border-b border-slate-700 hover:bg-slate-700"
    >

      <td className="p-4">{new Date(alert.timestamp).toLocaleTimeString()}</td>

      <td className="p-4">
         <SeverityBadge severity={alert.severity} />
      </td>

      <td className="p-4">{alert.rule_name}</td>

      <td className="p-4">{alert.agent_name}</td>

      <td className="p-4">
         <StatusBadge status={alert.status} />
    </td>

    </tr>

  ))}

      </tbody>

    </table>

  </div>
  );
}

export default AlertsTable;
