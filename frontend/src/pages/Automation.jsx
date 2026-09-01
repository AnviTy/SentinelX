import { useState } from "react";
import { playbooks } from "../data/playbooks";

function Automation() {
  const [selectedKey, setSelectedKey] = useState(null);

  const playbookEntries = Object.entries(playbooks);

  const selectedPlaybook = selectedKey
    ? playbooks[selectedKey]
    : null;

  return (
    <div className="text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Security Automation</h1>
        <p className="text-gray-400 mt-2">
          Automated response playbooks and security orchestration
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Active Playbooks</p>
          <p className="text-3xl font-bold mt-2">
            {playbookEntries.length}
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Automation Engine</p>
          <p className="text-xl font-semibold mt-2 text-cyan-400">
            Playbook Engine
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-xl p-5">
          <p className="text-gray-400 text-sm">Orchestration</p>
          <p className="text-xl font-semibold mt-2 text-green-400">
            n8n
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Playbooks */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">
            Response Playbooks
          </h2>

          {playbookEntries.map(([trigger, playbook]) => (
            <div
              key={trigger}
              onClick={() => setSelectedKey(trigger)}
              className={`bg-slate-800 border rounded-xl p-5 cursor-pointer transition ${
                selectedKey === trigger
                  ? "border-cyan-500"
                  : "border-slate-700 hover:border-slate-500"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    {playbook.name}
                  </h3>

                  <p className="text-sm text-gray-400 mt-1">
                    Trigger: {trigger}
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full text-xs bg-green-500/10 text-green-400">
                  ACTIVE
                </span>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-500 uppercase mb-2">
                  Conditions
                </p>

                <div className="flex flex-wrap gap-2">
                  {playbook.conditions.map((condition, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-900 text-gray-300 px-3 py-1 rounded-lg"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Details */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 h-fit">
          {selectedPlaybook ? (
            <>
              <p className="text-xs text-gray-500 uppercase">
                Selected Playbook
              </p>

              <h2 className="text-xl font-semibold mt-2">
                {selectedPlaybook.name}
              </h2>

              <div className="mt-6">
                <p className="text-xs text-gray-500 uppercase">
                  Trigger
                </p>

                <p className="text-gray-200 mt-2">
                  {selectedKey}
                </p>
              </div>

              <div className="mt-6">
                <p className="text-xs text-gray-500 uppercase">
                  Conditions Evaluated
                </p>

                <div className="mt-3 space-y-2">
                  {selectedPlaybook.conditions.map(
                    (condition, index) => (
                      <div
                        key={index}
                        className="bg-slate-900 rounded-lg p-3 text-sm text-gray-300"
                      >
                        <span className="text-green-400 mr-2">
                          ✓
                        </span>
                        {condition}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs text-gray-500 uppercase">
                  Response Actions
                </p>

                <div className="mt-3 space-y-2">
                  {selectedPlaybook.actions.map(
                    (action, index) => (
                      <div
                        key={index}
                        className="bg-slate-900 rounded-lg p-3 text-sm text-gray-300"
                      >
                        <span className="text-cyan-400 mr-2">
                          {index + 1}.
                        </span>
                        {action}
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-16">
              <p className="text-lg">
                Select a playbook
              </p>

              <p className="text-sm mt-2">
                View its trigger conditions and response actions.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Automation;