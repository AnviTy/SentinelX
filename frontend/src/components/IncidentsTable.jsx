import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

function IncidentsTable() {
  const [incidents, setIncidents] = useState([]);
const navigate = useNavigate();
  const fetchIncidents = () => {
    fetch("http://localhost:5000/api/incidents")
      .then((response) => response.json())
      .then((data) => {
        setIncidents(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const updateIncidentStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/incidents/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
        }),
      });

      fetchIncidents();

    } catch (error) {
      console.error(error);
    }
  };
  const assignIncident = async (id, assigned_to) => {
  try {
    await fetch(`http://localhost:5000/api/incidents/assign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assigned_to,
      }),
    });

    fetchIncidents();

  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="mt-10 bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">

      <h2 className="text-xl font-semibold text-white p-6 border-b border-slate-700">
        Active Incidents
      </h2>

      <table className="w-full text-left">

        <thead className="bg-slate-900 text-slate-300">
          <tr>
            <th className="p-4">ID</th>
            <th className="p-4">Alert ID</th>
            <th className="p-4">Title</th>
            <th className="p-4">Severity</th>
            <th className="p-4">Assigned To</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr
              key={incident.id}
              className="border-b border-slate-700 hover:bg-slate-700"
            >
              <td className="p-4">{incident.id}</td>
              <td className="p-4">
  <button
    onClick={() => navigate(`/alerts?alertId=${incident.alert_id}`)}
    className="text-cyan-400 hover:text-cyan-300 underline"
  >
    Alert #{incident.alert_id}
  </button>
</td>

              <td className="p-4">
                {incident.title}
              </td>

              <td className="p-4">
                <SeverityBadge severity={incident.severity} />
              </td>

              <td className="p-4">
                 <select
    value={incident.assigned_to || ""}
    onChange={(e) =>
      assignIncident(incident.id, e.target.value)
    }
    className="bg-slate-700 text-white rounded px-2 py-1"
  >
    <option value="SOC Analyst">SOC Analyst</option>
    <option value="Anvi">Anvi</option>
    <option value="Rahul">Rahul</option>
    <option value="Priya">Priya</option>
  </select>
              </td>

              <td className="p-4">
                <StatusBadge status={incident.status} />
              </td>

              <td className="p-4">

  {incident.status === "Open" && (
    <button
      onClick={() =>
        updateIncidentStatus(
          incident.id,
          "Investigating"
        )
      }
      className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-sm mr-2"
    >
      Investigate
    </button>
  )}

  {incident.status === "Investigating" && (
    <button
      onClick={() =>
        updateIncidentStatus(
          incident.id,
          "Contained"
        )
      }
      className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm mr-2"
    >
      Contain
    </button>
  )}

  {incident.status === "Contained" && (
    <button
      onClick={() =>
        updateIncidentStatus(
          incident.id,
          "Resolved"
        )
      }
      className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
    >
      Resolve
    </button>
  )}

</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default IncidentsTable;