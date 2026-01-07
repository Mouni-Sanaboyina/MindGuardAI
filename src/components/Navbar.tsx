import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-600 to-cyan-700 bg-clip-text text-transparent">
              MindGuard AI
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/')
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              } pb-1 transition-colors font-medium`}
            >
              Home
            </Link>
            <Link
              to="/how-it-works"
              className={`${
                isActive('/how-it-works')
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              } pb-1 transition-colors font-medium`}
            >
              How It Works
            </Link>
            <Link
              to="/analyze"
              className={`${
                isActive('/analyze')
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              } pb-1 transition-colors font-medium`}
            >
              Analyze Content
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about')
                  ? 'text-teal-600 border-b-2 border-teal-600'
                  : 'text-gray-600 hover:text-teal-600'
              } pb-1 transition-colors font-medium`}
            >
              About
            </Link>
          </div>

          <Link
            to="/analyze"
            className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-shadow font-medium"
          >
            Try Demo
          </Link>
        </div>
      </div>
    </nav>
  );
}
