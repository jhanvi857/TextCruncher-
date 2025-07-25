import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [mode, setMode] = useState("text");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if ((mode === "text" && text.trim()) || (mode === "pdf" && file)) {
      setLoading(true);
      setSummary("Summarizing... This may take a moment.");

      try {
        let data;
        if (mode === "text") {
          const res = await fetch("https://textcruncher.onrender.com/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          });
          data = await res.json();
        } else {
          const formData = new FormData();
          formData.append("pdf", file);
          const res = await fetch("https://textcruncher.onrender.com/summarize-pdf", {
            method: "POST",
            body: formData,
          });
          data = await res.json();
        }

        setSummary(data.summary || "Something went wrong or response was empty.");
      } catch (error) {
        console.error("Summarization error:", error);
        setSummary("Error: Unable to summarize at the moment.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please provide input text or upload a PDF file.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="w-full text-center py-12 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">
          TextCrunch - Smart Document Summarizer
        </h1>
        <p className="text-gray-200 max-w-xl mx-auto text-sm sm:text-base">
          Upload reports or paste text — get summaries in seconds. Runs offline.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Mode Toggle */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              mode === "text" ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setMode("text")}
          >
            📝 Text Mode
          </button>
          <button
            className={`cursor-pointer px-4 py-2 rounded ${
              mode === "pdf" ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => setMode("pdf")}
          >
            📄 PDF Mode
          </button>
        </div>

        {/* Input */}
        {mode === "text" ? (
          <textarea
            rows="10"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your document text here..."
            className="w-full border rounded bg-gray-800 p-4 text-white resize-none text-sm sm:text-base leading-relaxed"
          />
        ) : (
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleSummarize}
          disabled={loading}
          className={`w-full py-2 rounded-lg font-medium transition ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {/* Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📝 Summary</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 h-[350px] overflow-y-auto text-gray-200 text-sm sm:text-base leading-relaxed">
            <p className="whitespace-pre-line">
              {summary || "No summary yet. Upload or paste to begin."}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6 border-t border-gray-800">
        &copy; 2025 SmartSummarize. Built with Node.js + React
      </footer>
    </div>
  );
}

export default App;
