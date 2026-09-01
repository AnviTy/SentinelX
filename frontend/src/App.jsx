import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import AlertDetails from "./pages/AlertDetails";
import Incidents from "./pages/Incidents";
import Automation from "./pages/Automation";
import ThreatIntel from "./pages/ThreatIntel";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="flex min-h-screen bg-[#080a0d]">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="flex-1 p-10">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/alerts" element={<Alerts />} />

            <Route path="/alert/:id" element={<AlertDetails />} />

            <Route path="/incidents" element={<Incidents />} />

            <Route path="/automation" element={<Automation />} />

            <Route path="/threat-intel" element={<ThreatIntel />} />

            <Route path="/settings" element={<Settings />} />

          </Routes>

        </main>

      </div>

    </div>
  );
}

export default App;