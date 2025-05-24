import React from 'react';
import { 
  Award, 
  FileText, 
  Download, 
  TrendingUp, 
  CheckCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ActivityItem from '../components/dashboard/ActivityItem';
import ProgressChart from '../components/dashboard/ProgressChart';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="hidden sm:block">
          <select className="rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Last year</option>
            <option>All time</option>
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Achievements" 
          value="42" 
          change="+8%" 
          icon={<Award className="h-6 w-6 text-indigo-600" />} 
          trend="up"
        />
        <StatsCard 
          title="Resumes Created" 
          value="17" 
          change="+24%" 
          icon={<FileText className="h-6 w-6 text-blue-600" />} 
          trend="up"
        />
        <StatsCard 
          title="Downloads" 
          value="28" 
          change="+12%" 
          icon={<Download className="h-6 w-6 text-green-600" />} 
          trend="up"
        />
        <StatsCard 
          title="Profile Strength" 
          value="85%" 
          change="+5%" 
          icon={<TrendingUp className="h-6 w-6 text-purple-600" />} 
          trend="up"
        />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Profile completion */}
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Profile Completion</h2>
              <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-800">
                85% Complete
              </span>
            </div>
            <div className="mt-6">
              <ProgressChart />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Personal Info</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Education</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Work Experience</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Skills & Certificates</p>
                  <p className="text-xs text-gray-500">In progress</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent job matches */}
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900">Recent Job Matches</h2>
            <ul className="mt-5 divide-y divide-gray-200">
              <JobMatch 
                title="Senior Frontend Developer"
                company="TechCorp Inc."
                match="92%"
                color="bg-green-100 text-green-800"
              />
              <JobMatch 
                title="Full Stack Engineer"
                company="Innovate Solutions"
                match="87%"
                color="bg-green-100 text-green-800"
              />
              <JobMatch 
                title="UI/UX Developer"
                company="DesignHub"
                match="78%"
                color="bg-yellow-100 text-yellow-800"
              />
              <JobMatch 
                title="React Developer"
                company="AppWorks"
                match="65%"
                color="bg-yellow-100 text-yellow-800"
              />
            </ul>
            <div className="mt-5">
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                View all matches
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
          <div className="mt-6 flow-root">
            <ul className="divide-y divide-gray-200">
              <ActivityItem 
                title="Resume Downloaded"
                description="You downloaded your 'Senior Developer' resume"
                time="2 hours ago"
                icon={<Download className="h-5 w-5 text-blue-500" />}
              />
              <ActivityItem 
                title="New Achievement Added"
                description="Added 'Team Leadership Certificate' to your achievements"
                time="Yesterday"
                icon={<Award className="h-5 w-5 text-indigo-500" />}
              />
              <ActivityItem 
                title="Resume Tailored"
                description="AI tailored your resume for 'Full Stack Developer' position"
                time="2 days ago"
                icon={<FileText className="h-5 w-5 text-purple-500" />}
              />
              <ActivityItem 
                title="Job Application"
                description="Applied to 'Senior Frontend Developer' at TechCorp Inc."
                time="3 days ago"
                icon={<Briefcase className="h-5 w-5 text-green-500" />}
              />
            </ul>
          </div>
          <div className="mt-6">
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View all activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface JobMatchProps {
  title: string;
  company: string;
  match: string;
  color: string;
}

const JobMatch: React.FC<JobMatchProps> = ({ title, company, match, color }) => {
  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{title}</p>
          <p className="truncate text-sm text-gray-500">{company}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}>
            {match} Match
          </span>
        </div>
      </div>
    </li>
  );
};

export default Dashboard;