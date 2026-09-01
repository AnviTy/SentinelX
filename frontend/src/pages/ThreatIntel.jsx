import { threatIntel } from "../data/threatIntel";

function ThreatIntel() {
  const indicators = Object.entries(threatIntel);

  const suspiciousCount = indicators.filter(
    ([, data]) => data.reputation !== "Clean"
  ).length;

  const highConfidence = indicators.filter(
    ([, data]) => data.confidence >= 80
  ).length;

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Threat Intelligence
        </h1>

        <p className="text-gray-400 mt-2">
          IOC enrichment, reputation analysis and threat intelligence context
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">
            Indicators Monitored
          </p>

          <p className="text-3xl font-bold mt-2">
            {indicators.length}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">
            Suspicious Indicators
          </p>

          <p className="text-3xl font-bold mt-2 text-yellow-400">
            {suspiciousCount}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">
            High Confidence
          </p>

          <p className="text-3xl font-bold mt-2 text-red-400">
            {highConfidence}
          </p>
        </div>
      </div>

      {/* IOC Table */}
      <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
        <div className="p-5 border-b border-slate-700">
          <h2 className="text-xl font-semibold">
            Indicator Intelligence
          </h2>

          <p className="text-sm text-gray-400 mt-1">
            Enriched indicators associated with security events
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs uppercase text-gray-500 border-b border-slate-700">
                <th className="px-6 py-4">Indicator</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Reputation</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Source</th>
              </tr>
            </thead>

            <tbody>
              {indicators.map(([indicator, data]) => {
                const isClean = data.reputation === "Clean";

                return (
                  <tr
                    key={indicator}
                    className="border-b border-slate-700/60 hover:bg-slate-700/30"
                  >
                    <td className="px-6 py-5 font-mono text-sm">
                      {indicator}
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      IPv4
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          isClean
                            ? "bg-green-500/10 text-green-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {data.reputation}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-cyan-400 rounded-full"
                            style={{
                              width: `${data.confidence}%`,
                            }}
                          />
                        </div>

                        <span className="text-sm">
                          {data.confidence}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-300">
                      {data.source}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Flow */}
      <div className="mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-5">
          Threat Intelligence Pipeline
        </h2>

        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="bg-slate-900 px-4 py-2 rounded-lg">
            Security Alert
          </span>

          <span className="text-gray-500">→</span>

          <span className="bg-slate-900 px-4 py-2 rounded-lg">
            IOC Extraction
          </span>

          <span className="text-gray-500">→</span>

          <span className="bg-slate-900 px-4 py-2 rounded-lg">
            Threat Intelligence
          </span>

          <span className="text-gray-500">→</span>

          <span className="bg-slate-900 px-4 py-2 rounded-lg">
            Reputation + Confidence
          </span>

          <span className="text-gray-500">→</span>

          <span className="bg-slate-900 px-4 py-2 rounded-lg">
            Risk Assessment
          </span>
        </div>
      </div>
    </div>
  );
}

export default ThreatIntel;