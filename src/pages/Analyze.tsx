import { useState } from "react";
import {
  Upload,
  Video,
  Mic,
  Image as ImageIcon,
  FileText,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Analyze() {
  const [uploadType, setUploadType] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // Image safety
  const [showOriginal, setShowOriginal] = useState(false);

  // ---------------- ANALYZE ----------------
  const handleAnalyze = async () => {
    if (!uploadType) return;

    setLoading(true);
    setResult(null);
    setShowOriginal(false);

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (text) formData.append("text", text);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Analysis failed", err);
    }

    setLoading(false);
  };

  const imageUrl =
    result?.original_preview_url &&
    `http://127.0.0.1:5000${result.original_preview_url}`;

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-center mb-10">
          Analyze Content
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            <h2 className="font-semibold text-lg">Upload Content</h2>

            <div className="grid grid-cols-2 gap-4">
              {[
                { id: "video", icon: Video },
                { id: "audio", icon: Mic },
                { id: "image", icon: ImageIcon },
                { id: "text", icon: FileText },
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setUploadType(t.id);
                    setFile(null);
                    setText("");
                    setResult(null);
                  }}
                  className={`p-4 border rounded-lg ${
                    uploadType === t.id
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300"
                  }`}
                >
                  <t.icon className="mx-auto" />
                  <p className="text-sm mt-2 capitalize">{t.id}</p>
                </button>
              ))}
            </div>

            {/* FILE UPLOAD */}
            {uploadType && uploadType !== "text" && (
              <label className="block border-dashed border-2 rounded-lg p-6 text-center cursor-pointer">
                <Upload className="mx-auto mb-2" />
                {file ? (
                  <p className="text-green-600">{file.name}</p>
                ) : (
                  <p>Click to upload {uploadType}</p>
                )}
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </label>
            )}

            {/* TEXT INPUT */}
            {uploadType === "text" && (
              <textarea
                rows={5}
                className="w-full border rounded-lg p-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste text here..."
              />
            )}

            <button
              onClick={handleAnalyze}
              disabled={loading || !uploadType}
              className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold"
            >
              {loading ? "Analyzing..." : "Analyze Content"}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white p-6 rounded-xl shadow space-y-6">
            {!result ? (
              <div className="text-center text-gray-400">
                <Shield className="mx-auto mb-3" />
                Results will appear here
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-lg">Analysis Result</h3>

                {/* IMAGE PREVIEW */}
                {uploadType === "image" && imageUrl && (
                  <>
                    <img
                      src={imageUrl}
                      className={`mx-auto rounded-lg max-h-64 ${
                        result.blur_required && !showOriginal ? "blur-xl" : ""
                      }`}
                    />

                    {result.blur_required && (
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => setShowOriginal(!showOriginal)}
                          className="px-6 py-2 bg-red-600 text-white rounded-lg flex items-center gap-2"
                        >
                          {showOriginal ? <EyeOff size={16} /> : <Eye size={16} />}
                          {showOriginal ? "Hide Image" : "View Original"}
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* TEXT / AUDIO */}
                {result.transcribed_text && (
                  <div>
                    <p className="font-semibold mb-1">
                      {uploadType === "audio"
                        ? "Transcribed Audio"
                        : "Analyzed Text"}
                    </p>
                    <div className="bg-gray-100 p-3 rounded-lg text-sm whitespace-pre-wrap">
                      {result.transcribed_text}
                    </div>
                  </div>
                )}

                {/* SUMMARY */}
                <div
                  className={`p-4 rounded-lg text-sm font-medium ${
                    result.risk_score >= 30
                      ? "bg-red-50 text-red-800 border border-red-300"
                      : "bg-green-50 text-green-800 border border-green-300"
                  }`}
                >
                  {result.summary}
                </div>

                {/* TAGS */}
                {result.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {result.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* EXPLANATION */}
                <div className="text-xs text-gray-500">
                  {result.ai_explanation}
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
