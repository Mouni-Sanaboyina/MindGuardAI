import { useState } from "react";
import {
  Upload,
  Video,
  Mic,
  Image as ImageIcon,
  FileText,
  AlertTriangle,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";

export default function Analyze() {
  // ✅ STATES (ALL INSIDE COMPONENT)
  const [sensitivity, setSensitivity] = useState("general");
  const [uploadType, setUploadType] = useState<string | null>(null);

  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 🔒 SAFETY STATES
  const [consentGiven, setConsentGiven] = useState(false);
  const [viewingSensitive, setViewingSensitive] = useState(false);
const isAudio =
  uploadType === "audio" &&
  result?.original_preview_url;

  // ✅ ANALYZE HANDLER
  const handleAnalyze = async () => {
    if (!uploadType) return;

    setLoading(true);
    setResult(null);
    setPreviewUrl(null);

    // 🔁 RESET SAFETY STATES FOR NEW ANALYSIS
    setConsentGiven(false);
    setViewingSensitive(false);

    const formData = new FormData();
    if (file) formData.append("file", file);
    if (text) formData.append("text", text);
    formData.append("sensitivity", sensitivity);

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);

      // 🔒 SAFETY-FIRST DEFAULT PREVIEW
      if (data.blur_required) {
        setPreviewUrl(
          `http://127.0.0.1:5000${data.blurred_preview_url}`
        );
      } else {
        setPreviewUrl(
          `http://127.0.0.1:5000${data.original_preview_url}`
        );
      }
    } catch (err) {
      console.error("Analysis failed", err);
    }

    setLoading(false);
  };

  const riskScore = result?.risk_score ?? 0;
  const riskLevel =
    riskScore < 30 ? "safe" : riskScore < 70 ? "caution" : "high";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Content
          </h1>
          <p className="text-lg text-gray-600">
            Pre-screen content and receive safety warnings before viewing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT PANEL */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-6">Upload Content</h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { id: "video", icon: Video, label: "Video" },
                  { id: "audio", icon: Mic, label: "Audio" },
                  { id: "image", icon: ImageIcon, label: "Image" },
                  { id: "text", icon: FileText, label: "Text" },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setUploadType(item.id)}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      uploadType === item.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-teal-300"
                    }`}
                  >
                    <item.icon className="h-8 w-8 mx-auto mb-2 text-gray-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>

              {uploadType && uploadType !== "text" && (
                <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer block">
                  <Upload className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p className="text-gray-600 mb-1">
                    Click to upload {uploadType}
                  </p>
                  {file && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {file.name}
                    </p>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      setFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </label>
              )}

              {uploadType === "text" && (
                <textarea
                  className="w-full mt-4 p-4 border-2 rounded-xl"
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste text here..."
                />
              )}
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !uploadType}
              className={`w-full py-4 rounded-xl font-semibold text-lg ${
                loading
                  ? "bg-gray-400 text-white"
                  : "bg-gradient-to-r from-teal-500 to-cyan-600 text-white"
              }`}
            >
              {loading ? "Analyzing..." : "Analyze Content"}
            </button>
          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">
            {!result ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">
                  Results will appear after analysis
                </p>
              </div>
            ) : (
              <>
                {/* PREVIEW CARD */}
                {/* CONTENT PREVIEW */}
{previewUrl && (
  <div className="bg-white rounded-2xl shadow-lg p-8">
    <h3 className="font-semibold mb-4">Content Preview</h3>

    {/* IMAGE PREVIEW */}
    {uploadType === "image" && (
      <img
        src={previewUrl}
        alt="Preview"
        className="max-h-64 mx-auto rounded-lg shadow mb-4"
      />
    )}

    {/* AUDIO PREVIEW */}
    {uploadType === "audio" && (
      <div className="bg-gray-100 rounded-lg p-6 text-center mb-4">
        🎧 Audio content detected
      </div>
    )}

    {(result.blur_required || viewingSensitive) && (
      <div className="mb-4 bg-red-50 border border-red-300 rounded-lg p-4 text-sm text-red-800">
        ⚠️ This content has been flagged as sensitive.
        {viewingSensitive
          ? " You are currently accessing sensitive audio content."
          : " Playback is restricted to prevent accidental exposure."}
      </div>
    )}

    <div className="flex gap-3 justify-center">
      {result.blur_required && !consentGiven && (
        <button
          onClick={() => setConsentGiven(true)}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold"
        >
          ⚠️ Proceed with Caution
        </button>
      )}

      {consentGiven && uploadType === "audio" && (
        <audio controls className="w-full max-w-md">
          <source
            src={`http://127.0.0.1:5000${result.original_preview_url}`}
          />
        </audio>
      )}
    </div>
  </div>
)}

              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
