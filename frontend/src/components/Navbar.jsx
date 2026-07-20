function Navbar() {
  return (
    <div className="flex justify-between items-center bg-slate-900 border-b border-slate-700 px-8 py-4">

      <div>
        <h2 className="text-xl font-semibold text-white">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search alerts..."
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
        />

        <div className="text-green-400 font-medium">
          🟢 Online
        </div>

      </div>

    </div>
  );
}

export default Navbar;