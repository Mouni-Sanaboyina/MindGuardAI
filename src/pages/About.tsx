import { Shield, Heart, Eye, Lock, Users, Target, AlertCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-4 rounded-2xl shadow-lg">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About MindGuard AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A privacy-aware, ethical approach to content risk screening designed to empower users
            with safer online experiences
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            MindGuard AI was created with a singular purpose: to give people the power to make
            informed decisions about the content they consume online. In an era where disturbing
            and harmful content can unexpectedly appear in our feeds, we believe everyone deserves
            a tool that provides awareness and choice.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            We recognize that mental wellbeing is deeply personal and that what may be tolerable
            for one person could be triggering for another. Our system is designed to respect
            individual boundaries while maintaining the highest standards of privacy and user autonomy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-8 border border-teal-100">
            <div className="bg-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Eye className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
            <p className="text-gray-600 leading-relaxed">
              We believe in complete transparency about how content is analyzed and what factors
              contribute to risk scores. No black boxes, no hidden agendas.
            </p>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 border border-cyan-100">
            <div className="bg-cyan-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">User Autonomy</h3>
            <p className="text-gray-600 leading-relaxed">
              You remain in complete control. We provide information and recommendations, but the
              final decision about what to view is always yours.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-8 border border-green-100">
            <div className="bg-green-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Mental Wellbeing</h3>
            <p className="text-gray-600 leading-relaxed">
              Supporting mental health is at our core. We design with empathy, understanding the
              real impact that harmful content can have on individuals.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Privacy & Ethics Philosophy
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8 border-l-4 border-teal-500">
              <div className="flex items-start space-x-4">
                <Lock className="h-8 w-8 text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Privacy-First Design
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    All content analysis is conceptually performed locally and temporarily. We do not
                    store, collect, or transmit your content to external servers. Your privacy is
                    non-negotiable.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      No data collection or tracking
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      No permanent content storage
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      No sharing with third parties
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-teal-500 rounded-full mr-3"></span>
                      Local processing concept only
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border-l-4 border-cyan-500">
              <div className="flex items-start space-x-4">
                <Target className="h-8 w-8 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Ethical AI Principles
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">
                    Our approach to content analysis is guided by ethical AI principles that
                    prioritize human wellbeing, fairness, and accountability.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      No censorship - only information provision
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Culturally sensitive risk assessment
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Bias-aware algorithm design
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                      Continuous improvement based on feedback
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-8 border-l-4 border-green-500">
              <div className="flex items-start space-x-4">
                <Heart className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Mental Health Support
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    We recognize that content risk screening is part of a broader approach to
                    digital wellbeing. While our tool provides awareness, we strongly encourage
                    users to seek professional support when needed and to practice healthy
                    digital consumption habits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 md:p-12 border border-yellow-200">
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-8 w-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Important Disclaimer
              </h2>
              <div className="space-y-3 text-gray-700 leading-relaxed">
                <p>
                  <strong>Prototype Status:</strong> MindGuard AI is currently a conceptual prototype
                  developed for hackathon demonstration purposes. It is not intended for production
                  use and does not perform actual AI-powered content analysis at this time.
                </p>
                <p>
                  <strong>Not a Substitute:</strong> This tool is designed to complement, not replace,
                  professional mental health support. If you are experiencing distress, please reach
                  out to qualified mental health professionals or crisis support services.
                </p>
                <p>
                  <strong>Continuous Development:</strong> We are committed to refining our approach
                  based on user feedback, ethical considerations, and advances in responsible AI
                  technology. This is an evolving project guided by our core principles of privacy,
                  transparency, and user wellbeing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-3xl shadow-2xl p-12 text-center text-white">
          <Shield className="h-16 w-16 mx-auto mb-6 text-white" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Us in Building a Safer Digital World
          </h2>
          <p className="text-lg mb-8 text-teal-50 leading-relaxed max-w-2xl mx-auto">
            This project represents our vision for a more mindful, safety-conscious approach to
            online content consumption. We believe technology should empower users with awareness
            and choice, never compromise their privacy, and always prioritize mental wellbeing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transition-shadow">
              Share Feedback
            </button>
            <button className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-800 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
