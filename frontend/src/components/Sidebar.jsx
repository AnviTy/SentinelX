function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-700 text-white p-5">
      <h1 className="text-2xl font-bold mb-8">
        🛡️ SentinelX
      </h1>

      <ul className="space-y-4">
        <li className="cursor-pointer hover:text-cyan-400">📊 Dashboard</li>
        <li className="cursor-pointer hover:text-cyan-400">🚨 Alerts</li>
        <li className="cursor-pointer hover:text-cyan-400">📁 Incidents</li>
        <li className="cursor-pointer hover:text-cyan-400">🤖 Automation</li>
        <li className="cursor-pointer hover:text-cyan-400">🌐 Threat Intel</li>
        <li className="cursor-pointer hover:text-cyan-400">⚙️ Settings</li>
      </ul>
    </div>
  );
}

export default Sidebar;