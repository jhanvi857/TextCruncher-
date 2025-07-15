import './App.css'

function App() {

  return (
    <>
      <div className="flex flex-col items-center justify-between sm:min-h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <header className="w-full text-center py-12 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 shadow-md">
        <h1 className="text-4xl font-bold mb-2">🧠 Smart Document Summarizer</h1>
        <p className="text-gray-200 max-w-xl mx-auto">
          Upload reports, PDFs, or blogs — and get a concise summary in seconds. Works fully offline.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Upload Section */}
        <div className="bg-gray-900 rounded-xl border border-gray-800 shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-4">📤 Upload Document</h2>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition">
        <input
          type="file"
          accept="application/pdf"
          className="mb-4 w-full border p-2 rounded bg-gray-700 text-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
        />
        </div>
        <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-medium transition">
          Upload & Summarize
        </button>
        </div>
        {/* Summary Output */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">📝 Summary</h2>
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-h-[350px] overflow-y-auto text-gray-200">
            <p>
              {/* Placeholder summary text */}
              This is a short summary of your uploaded document. It captures the key points and compresses the content into a few concise sentences.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-center">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Reduction</p>
            <h3 className="text-xl font-bold text-blue-400">78%</h3>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Sentiment</p>
            <h3 className="text-xl font-bold text-green-400">Neutral</h3>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-sm text-gray-400">Word Count</p>
            <h3 className="text-xl font-bold text-yellow-400">1,423</h3>
          </div>
        </div>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">🔍 How It Works</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li>📄 Upload any document (PDF, blog, or report)</li>
            <li>🧠 Extractive summarization using local algorithms (TextRank, frequency)</li>
            <li>📊 Get metadata: sentiment, readability, word reduction</li>
            <li>🚫 No external APIs — works fully offline</li>
          </ul>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-600 text-sm py-6 mt-12 border-t border-gray-800 w-full">
        &copy; 2025 SmartSummarize. Built with Node.js + React
      </footer>
    </div>
    </>
  )
}

export default App
