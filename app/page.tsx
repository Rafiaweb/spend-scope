"use client";

import { useState } from "react";

const pricing = {
  "ChatGPT Plus": 20,
  "ChatGPT Team": 30,
  "Claude Pro": 20,
  "GitHub Copilot": 10,
};

export default function Home() {
  const [tool, setTool] = useState("ChatGPT Plus");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState("");

  const runAudit = () => {
    const users = Number(teamSize);
    const currentCost = pricing[tool as keyof typeof pricing] * users;

    let recommendedPlan = tool;
    let newCost = currentCost;
    let reason = "Your setup looks good.";

    if (tool === "ChatGPT Team" && users <= 2) {
      recommendedPlan = "ChatGPT Plus";
      newCost = 20 * users;
      reason = "Small teams usually don't need Team plan features.";
    }

    const monthlySavings = currentCost - newCost;
    const yearlySavings = monthlySavings * 12;

    setResult(`
Current monthly spend: $${currentCost}

Recommended: ${recommendedPlan}

Estimated monthly savings: $${monthlySavings}

Estimated yearly savings: $${yearlySavings}

Reason: ${reason}
`);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          SpendScope
        </h1>

        <p className="text-sm text-gray-500 text-center mb-5">
          AI spend audit for startups
        </p>

        <select
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          className="w-full p-2 border rounded mb-3"
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
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={runAudit}
          className="w-full bg-black text-white py-2 rounded"
        >
          Run Audit
        </button>

        {result && (
          <div className="mt-5 whitespace-pre-line p-4 bg-gray-100 rounded">
            {result}
          </div>
        )}
      </div>
    </main>
  );
}