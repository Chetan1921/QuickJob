import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0a0a14] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-fuchsia-600 flex items-center justify-center">
            <Briefcase className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="text-sm font-semibold text-white">JobPortal</span>
        </div>
        <p className="text-xs text-gray-500">© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        <div className="flex items-center gap-5">
          <Link to="/jobs" className="text-xs text-gray-400 hover:text-white">Find Jobs</Link>
          <Link to="/register" className="text-xs text-gray-400 hover:text-white">For Recruiters</Link>
        </div>
      </div>
    </footer>
  );
}
