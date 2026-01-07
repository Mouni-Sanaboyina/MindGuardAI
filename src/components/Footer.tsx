import { Shield, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-2 rounded-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
                MindGuard AI
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Privacy-aware content risk screening system. Empowering users with safer online experiences.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Project Info</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Hackathon Prototype</li>
              <li>Concept Demonstration</li>
              <li>Educational Purpose</li>
              <li>In Development</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-teal-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-teal-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            Prototype in Development - Not for Production Use
          </p>
          <p className="text-xs text-gray-400 mt-2">
            This is a conceptual demonstration for educational and awareness purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
