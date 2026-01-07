import { useState } from 'react';
import { Upload, Video, Mic, Image as ImageIcon, FileText, AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';

export default function Analyze() {
  const [sensitivity, setSensitivity] = useState('general');
  const [analyzing, setAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [uploadType, setUploadType] = useState<string | null>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResults(true);
    }, 2500);
  };

  const riskScore = 67;
  const riskLevel = riskScore < 30 ? 'safe' : riskScore < 70 ? 'caution' : 'high';

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Analyze Content
          </h1>
          <p className="text-lg text-gray-600">
            Upload or paste content to receive a comprehensive risk assessment
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Upload Content
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setUploadType('video')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    uploadType === 'video'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <Video className={`h-8 w-8 mx-auto mb-2 ${
                    uploadType === 'video' ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">Video</span>
                </button>

                <button
                  onClick={() => setUploadType('audio')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    uploadType === 'audio'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <Mic className={`h-8 w-8 mx-auto mb-2 ${
                    uploadType === 'audio' ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">Audio</span>
                </button>

                <button
                  onClick={() => setUploadType('image')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    uploadType === 'image'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <ImageIcon className={`h-8 w-8 mx-auto mb-2 ${
                    uploadType === 'image' ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">Image</span>
                </button>

                <button
                  onClick={() => setUploadType('text')}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    uploadType === 'text'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-teal-300'
                  }`}
                >
                  <FileText className={`h-8 w-8 mx-auto mb-2 ${
                    uploadType === 'text' ? 'text-teal-600' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium text-gray-700">Text</span>
                </button>
              </div>

              {uploadType && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-teal-400 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-1">
                    Drop your {uploadType} file here or click to browse
                  </p>
                  <p className="text-sm text-gray-400">
                    Demo mode - file upload simulated
                  </p>
                </div>
              )}

              {uploadType === 'text' && (
                <textarea
                  className="w-full mt-4 p-4 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
                  rows={4}
                  placeholder="Paste text content or URL here..."
                />
              )}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Sensitivity Mode
              </h2>
              <select
                value={sensitivity}
                onChange={(e) => setSensitivity(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-xl focus:border-teal-500 focus:outline-none"
              >
                <option value="general">General - Standard screening</option>
                <option value="sensitive">Sensitive - Stricter filtering</option>
                <option value="reviewer">Reviewer - Professional mode</option>
              </select>
              <p className="text-sm text-gray-500 mt-3">
                Adjust the sensitivity level based on your current mental state and needs
              </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!uploadType || analyzing}
              className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                uploadType && !analyzing
                  ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {analyzing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing Content...
                </span>
              ) : (
                'Analyze Content'
              )}
            </button>
          </div>

          <div className="space-y-6">
            {!showResults ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Results Panel
                </h3>
                <p className="text-gray-500">
                  Upload content and click Analyze to see the risk assessment
                </p>
              </div>
            ) : (
              <>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Risk Assessment
                    </h2>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
                      riskLevel === 'safe' ? 'bg-green-100 text-green-700' :
                      riskLevel === 'caution' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {riskLevel === 'safe' ? 'Low Risk' :
                       riskLevel === 'caution' ? 'Moderate Risk' :
                       'High Risk'}
                    </span>
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Human-Safety Risk Score</span>
                      <span className="text-2xl font-bold text-gray-900">{riskScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          riskLevel === 'safe' ? 'bg-green-500' :
                          riskLevel === 'caution' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${riskScore}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-xl p-6 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 backdrop-blur-xl bg-gray-300/50 flex items-center justify-center">
                      <span className="bg-white px-4 py-2 rounded-lg text-sm font-medium text-gray-700 shadow-lg">
                        Preview Blurred for Safety
                      </span>
                    </div>
                    <div className="h-40 bg-gradient-to-br from-gray-300 to-gray-400" />
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-yellow-900 mb-1">Risk Summary</h4>
                        <p className="text-sm text-yellow-800 leading-relaxed">
                          This content contains moderate levels of concerning material. Visual analysis
                          detected potentially disturbing imagery. Audio cues suggest aggressive tones.
                          Text analysis identified some concerning language patterns.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Detected Warning Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      Violence
                    </span>
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      Harassment
                    </span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                      Aggressive Language
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Violence Detection</span>
                      <span className="text-sm font-bold text-red-600">High (78%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Harassment Signals</span>
                      <span className="text-sm font-bold text-orange-600">Medium (54%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Hate Speech</span>
                      <span className="text-sm font-bold text-green-600">Low (12%)</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm font-medium text-gray-700">Self-Harm Content</span>
                      <span className="text-sm font-bold text-green-600">Low (8%)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl shadow-lg p-8 border border-teal-100">
                  <div className="flex items-start space-x-3 mb-4">
                    <Shield className="h-6 w-6 text-teal-600 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Safer Alternatives Suggested
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        Based on this content's risk level, you may want to consider viewing alternative
                        content or taking a break. Your mental wellbeing matters.
                      </p>
                      <div className="flex space-x-3">
                        <button className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Find Alternatives
                        </button>
                        <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors">
                          Proceed with Caution
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
