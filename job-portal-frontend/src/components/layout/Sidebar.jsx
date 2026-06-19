import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, User, FileText, ListChecks, Building2, Briefcase, ClipboardList,
} from 'lucide-react';

const JOB_SEEKER_LINKS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/applications', label: 'My Applications', icon: ListChecks },
];

const RECRUITER_LINKS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/companies', label: 'Companies', icon: Building2 },
  { to: '/dashboard/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/dashboard/applications', label: 'Applications', icon: ClipboardList },
  { to: '/profile', label: 'Profile', icon: User },
];

export default function Sidebar({ role }) {
  const links = role === 'recruiter' ? RECRUITER_LINKS : JOB_SEEKER_LINKS;

  return (
    <aside className="hidden md:block w-56 shrink-0 border-r border-white/10 py-8 pr-4">
      <nav className="space-y-1 sticky top-24">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive ? 'bg-primary/15 text-white border border-primary/30' : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <l.icon className="h-4 w-4" />
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
