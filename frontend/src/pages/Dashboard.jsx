import { useState, useEffect } from "react";
import {
  Award,
  FileText,
  Download,
  TrendingUp,
  CheckCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import StatsCard from "../components/dashboard/StatsCard";
import ActivityItem from "../components/dashboard/ActivityItem";
import ProgressChart from "../components/dashboard/ProgressChart";
import ActivityHeatmap from "../components/dashboard/heatmap";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import LoadingSpinner from "../components/LoadingSpinner";
import { useUserStore } from "../store/userstore";

const Dashboard = () => {
  const [activityHeatmapData, setActivityHeatmapData] = useState([]);
  const [projectsCount, setProjectsCount] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);
  const [experiencesCount, setExperiencesCount] = useState(0);
  const [totalAchievements, setTotalAchievements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          API_PATHS.DASHBOARD.GET_DATA(userData._id)
        );

        const mapped = Object.entries(response.data.activityStreak || {}).map(
          ([date, count]) => ({ date, count })
        );

        setActivityHeatmapData(mapped);
        setProjectsCount(response.data.total?.projects || 0);
        setCertificatesCount(response.data.total?.certificates || 0);
        setExperiencesCount(response.data.total?.experiences || 0);
        setTotalAchievements(
          (response.data.total?.projects || 0) +
            (response.data.total?.certificates || 0) +
            (response.data.total?.experiences || 0)
        );
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Achievements"
          value={totalAchievements}
          icon={<Award className="h-6 w-6 text-indigo-600" />}
          trend="up"
        />
        <StatsCard
          title="Resumes Created"
          value="17"
          change="+24%"
          icon={<TrendingUp className="h-6 w-6 text-blue-600" />}
          trend="up"
        />
        <StatsCard
          title="Projects Completed"
          value={projectsCount}
          icon={<Briefcase className="h-6 w-6 text-green-600" />}
          trend="up"
        />
        <StatsCard
          title="Certificates Earned"
          value={certificatesCount}
          icon={<FileText className="h-6 w-6 text-purple-600" />}
          trend="up"
        />
      </div>

      {/* Middle row */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Heatmap card */}
        <div className="flex-grow h-80 sm:h-96 lg:h-[28rem]">
          <ActivityHeatmap activities={activityHeatmapData} />
        </div>

        {/* Recent job matches */}
        <div className="rounded-lg bg-white shadow p-6 flex flex-col">
          <h2 className="text-lg font-medium text-gray-900">
            Recent Job Matches
          </h2>
          <ul className="mt-5 divide-y divide-gray-200 flex-grow overflow-auto">
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

const JobMatch = ({ title, company, match, color }) => {
  return (
    <li className="py-4">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">{title}</p>
          <p className="truncate text-sm text-gray-500">{company}</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <span
            className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
          >
            {match} Match
          </span>
        </div>
      </div>
    </li>
  );
};

export default Dashboard;
