import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, SearchX } from 'lucide-react';
import { getActiveJobs } from './jobApi';
import JobCard from '@/components/cards/JobCard';
import Skeleton from '@/components/ui/Skeleton';
import EmptyState from '@/components/ui/EmptyState';

const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];
const WORK_LOCATIONS = ['Remote', 'OnSite', 'Hybrid'];

export default function JobsListPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [jobType, setJobType] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await getActiveJobs({
          page,
          limit: 9,
          search: search || undefined,
          jobType: jobType || undefined,
          workLocation: workLocation || undefined,
          sort: 'latest',
        });

        // ✅ FIX 1: Removed the extra .data (Now matches backend structure exactly)
        setJobs(res.data.jobs || []);
        setTotalPages(res.data.totalPages || 1);
        setTotalJobs(res.data.totalJobs || 0);
      } catch (err) {
        // toast handled globally
      } finally {
        setLoading(false);
      }
    };

    // ✅ FIX 2: Added debounce (500ms) so it doesn't fetch on every keystroke
    const timeoutId = setTimeout(fetchJobs, 500);
    return () => clearTimeout(timeoutId);

    // ✅ FIX 3: Removed 'search' from deps to prevent unnecessary re-runs
  }, [page, jobType, workLocation]); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams(search ? { search } : {});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1.5">Find your next job</h1>
        <p className="text-gray-400 text-sm">{totalJobs} open positions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 mb-8">
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2.5">
          <Search className="h-4.5 w-4.5 text-gray-500 shrink-0" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, skill, or company"
            className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
          />
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
          <SlidersHorizontal className="h-4 w-4 text-gray-500 shrink-0" />
          <select
            value={jobType}
            onChange={(e) => { setJobType(e.target.value); setPage(1); }}
            className="bg-white/[0.04] border border-white/10 text-sm text-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary/50 shrink-0"
          >
            <option value="">All Job Types</option>
            {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={workLocation}
            onChange={(e) => { setWorkLocation(e.target.value); setPage(1); }}
            className="bg-white/[0.04] border border-white/10 text-sm text-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:border-primary/50 shrink-0"
          >
            <option value="">All Locations</option>
            {WORK_LOCATIONS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
      ) : jobs.length === 0 ? (
        <EmptyState
          icon={SearchX}
          title="No jobs found"
          description="Try adjusting your search or filters to find more results."
        />
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => <JobCard key={job.job_id} job={job} />)}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-400 px-2">Page {page} of {totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-9 w-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-40 disabled:hover:bg-transparent"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}