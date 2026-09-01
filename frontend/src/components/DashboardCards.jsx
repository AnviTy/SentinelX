import { useEffect, useState } from "react";

function DashboardCards() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/alerts")
      .then((res) => res.json())
      .then((data) => {
        setAlerts(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error("Failed to fetch dashboard alerts:", error);
      });
  }, []);

  const critical = alerts.filter(
    (alert) => alert.severity?.toLowerCase() === "critical"
  ).length;

  const high = alerts.filter(
    (alert) => alert.severity?.toLowerCase() === "high"
  ).length;

  const medium = alerts.filter(
    (alert) => alert.severity?.toLowerCase() === "medium"
  ).length;

  const stats = [
    {
      title: "Critical Alerts",
      value: critical,
      color: "text-red-400",
    },
    {
      title: "High Alerts",
      value: high,
      color: "text-orange-400",
    },
    {
      title: "Medium Alerts",
      value: medium,
      color: "text-yellow-400",
    },
    {
      title: "Healthy Agents",
      value: 8,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-6 mt-8">

      {stats.map((card) => (
        <div
          key={card.title}
          className="
            bg-[#111318]
            rounded-xl
            p-6
            border border-slate-800
            shadow-lg
          "
        >
          <p className="text-slate-500 text-xs uppercase tracking-wider">
            {card.title}
          </p>

          <h1 className={`text-4xl font-bold mt-3 ${card.color}`}>
            {card.value}
          </h1>
        </div>
      ))}

    </div>
  );
}

export default DashboardCards;