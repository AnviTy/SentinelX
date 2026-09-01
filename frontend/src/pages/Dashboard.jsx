import DashboardCards from "../components/DashboardCards";
import AlertsTable from "../components/AlertsTable";

function Dashboard() {
  return (
    <div className="text-white">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      <p className="text-slate-400 mt-2">
        Security Operations Center
      </p>

      <DashboardCards />

      <AlertsTable />

    </div>
  );
}

export default Dashboard;