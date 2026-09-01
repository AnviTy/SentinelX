import { NavLink } from "react-router-dom";

function Sidebar() {
  const navItems = [
    { to: "/", label: "Dashboard", icon: "📊" },
    { to: "/alerts", label: "Alerts", icon: "🚨" },
    { to: "/incidents", label: "Incidents", icon: "📁" },
    { to: "/automation", label: "Automation", icon: "🤖" },
    { to: "/threat-intel", label: "Threat Intel", icon: "🌐" },
    { to: "/settings", label: "Settings", icon: "⚙️" },
  ];

  return (
    <aside className="w-60 h-screen bg-[#0b0d10] border-r border-[#252932] text-white px-4 py-6 flex flex-col">

      {/* Logo */}
      <div className="px-3 mb-10">
        <h1 className="text-2xl font-bold tracking-tight">
          🛡️ <span>SentinelX</span>
        </h1>

        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-2">
          Security Operations
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.2em] text-slate-600">
          Platform
        </p>

        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `
                  flex items-center gap-3
                  px-3 py-3
                  rounded-xl
                  text-sm font-medium
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/20 shadow-sm"
                      : "text-slate-400 hover:bg-[#15171c] hover:text-slate-200"
                  }
                  `
                }
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom status */}
      <div className="mx-2 mt-auto p-3 rounded-xl bg-[#15171c] border border-[#252932]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>

          <span className="text-xs text-slate-400">
            System Online
          </span>
        </div>

        <p className="text-[10px] text-slate-600 mt-1">
          SentinelX Core
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;