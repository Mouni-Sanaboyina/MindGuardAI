import { Upload, Cpu, BarChart3, CheckCircle, Eye, Mic, FileText, Lock, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A simple, privacy-aware workflow designed to help you make informed decisions about online content
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <div className="bg-teal-100 text-teal-700 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Uploads</h3>
              <p className="text-sm text-gray-600">
                Upload video, audio, image, or paste text/URL for analysis
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ArrowRight className="h-6 w-6 text-teal-400" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="h-8 w-8 text-white" />
              </div>
              <div className="bg-cyan-100 text-cyan-700 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">System Analyzes</h3>
              <p className="text-sm text-gray-600">
                Multi-modal AI screening for potential risks and concerning signals
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ArrowRight className="h-6 w-6 text-cyan-400" />
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div className="bg-green-100 text-green-700 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Risk Index Shown</h3>
              <p className="text-sm text-gray-600">
                View safety scores, warnings, and detailed risk summaries
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
              <ArrowRight className="h-6 w-6 text-green-400" />
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <div className="bg-blue-100 text-blue-700 text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User Decides</h3>
              <p className="text-sm text-gray-600">
                Make informed choice to view, skip, or find safer alternatives
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Multi-Modal Analysis Approach
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
              <div className="bg-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Visual Analysis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Scans video frames and images for visual indicators of violence, graphic content,
                disturbing imagery, and other concerning visual elements.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
              <div className="bg-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Mic className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Audio Cues</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Analyzes audio for aggressive tones, distressing sounds, hate speech, harassment,
                and other concerning audio indicators.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
              <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <FileText className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Text & NLP</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Processes text content, captions, and comments for harmful language, threats,
                self-harm references, and toxic patterns.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
              <div className="bg-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                <Lock className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Privacy-Safe Design</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Local processing concept ensures your content remains private. No permanent storage
                or sharing of analyzed material.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Key Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-teal-100 p-3 rounded-lg flex-shrink-0">
                <BarChart3 className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Human-Safety Risk Index
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Clear numerical scoring system that quantifies content risk levels across multiple
                  safety dimensions, helping you understand severity at a glance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-100 p-3 rounded-lg flex-shrink-0">
                <Eye className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Blur-Preview Safety Layer
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Content thumbnails are automatically blurred when risks are detected, preventing
                  accidental exposure while you review the safety report.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Adjustable Sensitivity Levels
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose between General, Sensitive, or Reviewer modes to match your current
                  mental state and adjust the strictness of content screening.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                <Lock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Privacy-First Philosophy
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  All analysis is conceptually performed locally and temporarily. No data collection,
                  no tracking, no permanent storage of your analyzed content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl shadow-2xl p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Important Note</h2>
            <p className="text-lg text-teal-50 leading-relaxed">
              This is a conceptual prototype designed for demonstration purposes. The system performs
              local and temporary analysis only. No content is stored, shared, or transmitted to
              external servers. This tool is meant to empower users with awareness and informed
              decision-making capabilities.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
