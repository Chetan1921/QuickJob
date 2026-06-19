import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, ListChecks, Building2, ClipboardList, FileCheck2, Award } from 'lucide-react';
import StatCard from '@/components/cards/StatCard';
import { getMyApplications } from './jobApi';
import { getAllCompanies } from '@/features/companies/companyApi';
import Skeleton from '@/components/ui/Skeleton';

export default function DashboardOverview() {
  const { user } = useSelector((state) => state.auth);
  const isRecruiter = user?.role === 'recruiter';
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (isRecruiter) {
          const res = await getAllCompanies({ page: 1, limit: 1 });
          setStats({ companies: res.data.total || 0 });
        } else {
          const res = await getMyApplications({ page: 1, limit: 1 });
          setStats({ applications: res.data.totalApplications || 0 });
        }
      } catch (err) {
        // handled globally
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isRecruiter]);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1.5">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
      <p className="text-gray-400 text-sm mb-8">
        {isRecruiter ? "Here's how your hiring pipeline is looking." : "Here's a snapshot of your job search."}
      </p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
        </div>
      ) : isRecruiter ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={Building2} label="Total Companies" value={stats.companies ?? 0} />
          <StatCard icon={Briefcase} label="Active Jobs" value="—" tone="success" />
          <StatCard icon={ClipboardList} label="Total Applications" value="—" tone="warning" />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard icon={ListChecks} label="Applications Sent" value={stats.applications ?? 0} />
          <StatCard icon={FileCheck2} label="Resume Status" value={user ? 'Active' : '—'} tone="success" />
          <StatCard icon={Award} label="Profile Completion" value="80%" tone="warning" />
        </div>
      )}
    </div>
  );
}
