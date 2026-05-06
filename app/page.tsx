export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        
        <h1 className="text-2xl font-bold text-center mb-2">
          SpendScope
        </h1>

        <p className="text-sm text-gray-500 text-center mb-5">
          Check if you're overspending on AI tools
        </p>

        <input
          type="text"
          placeholder="Tool (e.g. ChatGPT)"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          placeholder="Monthly spend ($)"
          className="w-full p-2 border rounded mb-3"
        />

        <input
          type="number"
          placeholder="Team size"
          className="w-full p-2 border rounded mb-4"
        />

        <button className="w-full bg-black text-white py-2 rounded">
          Run Audit
        </button>

      </div>
    </main>
  );
}