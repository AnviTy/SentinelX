function Navbar() {
  return (
    <header className="h-16 bg-[#0b0d10] border-b border-[#252932] px-8 flex items-center justify-between">

      {/* Page title */}
      <div>
        <h2 className="text-lg font-semibold text-white tracking-tight">
          Dashboard
        </h2>

        <p className="text-[11px] text-slate-500 mt-0.5">
          Security Operations Center
        </p>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search alerts..."
            className="
              w-64
              bg-[#15171c]
              border border-[#252932]
              rounded-lg
              px-4 py-2
              text-sm text-slate-200
              placeholder:text-slate-600
              outline-none
              transition
              focus:border-indigo-500/50
              focus:ring-1
              focus:ring-indigo-500/20
            "
          />
        </div>

        {/* System status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>

          <span className="text-sm font-medium text-emerald-400">
            Online
          </span>
        </div>

      </div>
    </header>
  );
}

export default Navbar;