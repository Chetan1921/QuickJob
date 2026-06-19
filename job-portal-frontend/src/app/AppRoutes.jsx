import { Routes, Route } from 'react-router-dom';

import PublicLayout from '@/components/layout/PublicLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

import HomePage from '@/features/jobs/HomePage';
import JobsListPage from '@/features/jobs/JobsListPage';
import JobDetailsPage from '@/features/jobs/JobDetailsPage';

import LoginPage from '@/features/auth/LoginPage';
import RegisterPage from '@/features/auth/RegisterPage';
import ForgotPasswordPage from '@/features/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage';

import ProfilePage from '@/features/users/ProfilePage';
import DashboardOverview from '@/features/jobs/DashboardOverview';

import MyApplicationsPage from '@/features/applications/MyApplicationsPage';
import RecruiterApplicationsPage from '@/features/applications/RecruiterApplicationsPage';

import CompaniesPage from '@/features/companies/CompaniesPage';
import NewCompanyPage from '@/features/companies/NewCompanyPage';
import RecruiterJobsPage from '@/features/jobs/RecruiterJobsPage';
import NewJobPage from '@/features/jobs/NewJobPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public layout (navbar + footer) */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsListPage />} />
        <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

        {/* Job seeker only */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute allowedRoles={['job_seeker']}>
              <MyApplicationsPage />
            </ProtectedRoute>
          }
        />

        {/* Shared protected — both roles */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth pages — no navbar/footer */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset/:token" element={<ResetPasswordPage />} />

      {/* Dashboard layout (navbar + sidebar) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardOverview />} />

        {/* Recruiter only */}
        <Route
          path="/dashboard/companies"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <CompaniesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/companies/new"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <NewCompanyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobs"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <RecruiterJobsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/jobs/new"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <NewJobPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/applications"
          element={
            <ProtectedRoute allowedRoles={['recruiter']}>
              <RecruiterApplicationsPage />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}
