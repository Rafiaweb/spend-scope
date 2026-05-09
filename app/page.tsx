"use client";

import { useEffect, useState } from "react";

const pricing = {
  "ChatGPT Plus": 20,
  "ChatGPT Team": 30,
  "Claude Pro": 20,
  "GitHub Copilot": 10,
};

export default function Home() {
  const [tool, setTool] = useState("ChatGPT Plus");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    const savedTool = localStorage.getItem("tool");
    const savedTeam = localStorage.getItem("teamSize");

    if (savedTool) setTool(savedTool);
    if (savedTeam) setTeamSize(savedTeam);
  }, []);

  useEffect(() => {
    localStorage.setItem("tool", tool);
    localStorage.setItem("teamSize", teamSize);
  }, [tool, teamSize]);

  const runAudit = () => {
    const users = Number(teamSize);

    const currentCost = pricing[tool as keyof typeof pricing] * users;

    let recommendedPlan = tool;
    let newCost = currentCost;
    let reason = "Your setup already looks optimized.";

    if (tool === "ChatGPT Team" && users <= 2) {
      recommendedPlan = "ChatGPT Plus";
      newCost = 20 * users;
      reason =
        "Small teams usually don't need ChatGPT Team collaboration features.";
    }

    const monthlySavings = currentCost - newCost;
    const yearlySavings = monthlySavings * 12;

    setResult({
      currentCost,
      recommendedPlan,
      monthlySavings,
      yearlySavings,
      reason,
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">

      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl font-bold text-center mb-2">
          SpendScope
        </h1>

        <p className="text-gray-500 text-center mb-6">
          Audit your AI tool spending in seconds
        </p>

        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="w-full p-3 border rounded-xl mb-4"
        >
          <option>ChatGPT Plus</option>
          <option>ChatGPT Team</option>
          <option>Claude Pro</option>
          <option>GitHub Copilot</option>
        </select>

        <input
          type="number"
          placeholder="Team size"
          value={teamSize}
          onChange={(e) => setTeamSize(e.target.value)}
          className="w-full p-3 border rounded-xl mb-5"
        />

        <button
          onClick={runAudit}
          className="w-full bg-black hover:bg-gray-800 transition text-white py-3 rounded-xl font-medium"
        >
          Run Audit
        </button>

        {result && (
          <div className="mt-6 space-y-4">

            <div className="bg-gray-100 p-4 rounded-2xl">
              <p className="text-sm text-gray-500">Current Monthly Spend</p>
              <h2 className="text-2xl font-bold">
                ${result.currentCost}
              </h2>
            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <p className="text-sm text-green-700">
                Estimated Yearly Savings
              </p>
              <h2 className="text-3xl font-bold text-green-800">
                ${result.yearlySavings}
              </h2>
            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <p className="text-sm text-blue-700">
                Recommended Plan
              </p>
              <h2 className="text-xl font-semibold">
                {result.recommendedPlan}
              </h2>
            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">
              <p className="text-sm text-yellow-700">
                Why?
              </p>
              <p className="font-medium">
                {result.reason}
              </p>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}