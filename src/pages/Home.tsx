import { Link } from 'react-router-dom';
import { Shield, Users, Eye, Heart, CheckCircle, AlertTriangle, Layers } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
              <Shield className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            MindGuard AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto leading-relaxed">
            Privacy-Aware Content Risk Screening System
          </p>
          <p className="text-lg text-gray-500 mb-10 max-w-2xl mx-auto">
            Pre-screen online content before viewing. Know the risks. Protect your mental wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analyze"
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-shadow"
            >
              Analyze Content
            </Link>
            <Link
              to="/how-it-works"
              className="bg-white text-teal-600 border-2 border-teal-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-teal-50 transition-colors"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            What is MindGuard AI?
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl mx-auto">
            MindGuard AI is a privacy-first content risk screening system that helps you understand
            potential risks in online content before you view it. Using multi-modal analysis, it
            evaluates videos, images, audio, and text for concerning signals such as violence,
            harassment, hate speech, and self-harm content.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-teal-100 p-4 rounded-full mb-4">
                <Eye className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pre-Screen Content</h3>
              <p className="text-sm text-gray-600">
                Analyze before viewing to make informed decisions about what you consume
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-cyan-100 p-4 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Risk Awareness</h3>
              <p className="text-sm text-gray-600">
                Understand potential mental health impacts and content sensitivity levels
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Privacy Protected</h3>
              <p className="text-sm text-gray-600">
                Local analysis concept - your content stays private and secure
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Why Content Pre-Screening Matters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
            <div className="flex items-start space-x-4">
              <div className="bg-teal-500 p-3 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Wellbeing</h3>
                <p className="text-gray-600 leading-relaxed">
                  Exposure to disturbing content can impact mental health. Pre-screening allows you
                  to make informed choices about what you consume, protecting your emotional wellbeing.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
            <div className="flex items-start space-x-4">
              <div className="bg-green-500 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Informed Decisions</h3>
                <p className="text-gray-600 leading-relaxed">
                  Know what you're about to view before you see it. Make conscious choices about
                  content consumption based on your current mental state and sensitivity levels.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trigger Awareness</h3>
                <p className="text-gray-600 leading-relaxed">
                  Everyone has different sensitivities. Our system helps identify potential triggers
                  so you can prepare yourself or choose to avoid certain content entirely.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Layers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Multi-Modal Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Content risks aren't just visual. Our system analyzes video frames, audio cues,
                  text, and context to provide comprehensive risk assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Who Benefits From MindGuard AI?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">General Users</h3>
            <p className="text-gray-600 leading-relaxed">
              Anyone looking to be more mindful about their online content consumption. Perfect for
              those managing anxiety, stress, or simply wanting healthier digital habits.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-green-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Young People & Teens</h3>
            <p className="text-gray-600 leading-relaxed">
              Helps younger users navigate online spaces more safely, understanding content risks
              before exposure. A tool for building digital literacy and self-awareness.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Content Reviewers</h3>
            <p className="text-gray-600 leading-relaxed">
              Professionals who review user-generated content can use pre-screening to prepare
              mentally and adjust their workflow based on content severity levels.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Safer Content Awareness?
          </h2>
          <p className="text-lg mb-8 text-teal-50">
            Try our demo and see how content risk screening can enhance your digital wellbeing
          </p>
          <Link
            to="/analyze"
            className="inline-block bg-white text-teal-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-shadow"
          >
            Try the Demo Now
          </Link>
        </div>
      </section>
    </div>
  );
}
