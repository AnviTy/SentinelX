import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Alerts from "./pages/Alerts";
import Incidents from "./pages/Incidents";
import Automation from "./pages/Automation";
import ThreatIntel from "./pages/ThreatIntel";
import Settings from "./pages/Settings";

function App() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <div className="p-8">

          <Routes>

            <Route path="/" element={<Dashboard />} />

            <Route path="/alerts" element={<Alerts />} />

            <Route path="/incidents" element={<Incidents />} />

            <Route path="/automation" element={<Automation />} />

            <Route path="/threat-intel" element={<ThreatIntel />} />

            <Route path="/settings" element={<Settings />} />

          </Routes>

        </div>

      </div>

    </div>
  );
}

export default App;