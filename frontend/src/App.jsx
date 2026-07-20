import Sidebar from "./components/Sidebar";
import DashboardCards from "./components/DashboardCards";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-white">
            Welcome back, Analyst 👋
          </h1>

          <p className="text-slate-400 mt-2">
            Cloud Hosted SOAR Platform
          </p>

          <DashboardCards />
        </div>
      </div>
    </div>
  );
}

export default App;