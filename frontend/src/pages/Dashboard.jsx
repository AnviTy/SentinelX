import DashboardCards from "../components/DashboardCards";
import AlertsTable from "../components/AlertsTable";

function Dashboard() {
  return (
    <>
      <h1 className="text-4xl font-bold text-white">
        Welcome back, Analyst 👋
      </h1>

      <p className="text-slate-400 mt-2">
        Cloud Hosted SOAR Platform
      </p>

      <DashboardCards />

      <AlertsTable />
    </>
  );
}

export default Dashboard;