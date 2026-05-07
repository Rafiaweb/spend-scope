"use client";

import { useState } from "react";

export default function Home() {
  const [tool, setTool] = useState("ChatGPT Plus");
  const [spend, setSpend] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [result, setResult] = useState("");

  const runAudit = () => {
    const spendNum = Number(spend);
    const teamNum = Number(teamSize);

    if (tool === "ChatGPT Team" && teamNum <= 2) {
      setResult(
        `You're likely overspending. ChatGPT Plus may be enough for your small team. Estimated savings: $30/month`
      );
    } else if (spendNum > 100) {
      setResult(
        `Your AI spend is quite high. Consider cheaper plans or vendor credits.`
      );
    } else {
      setResult(`Your current setup looks reasonable.`);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          SpendScope
        </h1>

        <p className="text-sm text-gray-500 text-center mb-5">
          Check if you're overspending on AI tools
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
          placeholder="Monthly spend ($)"
          value={spend}
          onChange={(e) => setSpend(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

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
          <div className="mt-5 p-3 bg-gray-100 rounded">
            <p>{result}</p>
          </div>
        )}
      </div>
    </main>
  );
}