import { NavLink } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🛡️ SentinelX
      </h1>

      <ul className="space-y-4">
        <NavLink
  to="/"
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         📊 Dashboard
        </NavLink>
        <NavLink
  to="/alerts"
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         🚨 Alerts
        </NavLink>
        <NavLink
  to="/incidents"
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         📁 Incidents
        </NavLink>
        <NavLink
  to="/automation"
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         🤖 Automation
        </NavLink>
        <NavLink
  to="/threat-intel"
 className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         🌐 Threat Intel
        </NavLink>
        <NavLink
  to="/settings"
  className={({ isActive }) =>
  `block rounded-lg px-3 py-2 transition ${
    isActive
      ? "bg-cyan-600 text-white"
      : "hover:bg-slate-800 hover:text-cyan-400"
  }`
}
        >
         ⚙️ Settings
        </NavLink>
      </ul>
    </div>
  );
}

export default Sidebar;