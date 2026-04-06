import { useState } from "react";
import { useAuth } from "../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { FolderOpen, Inbox, LogOut, LayoutDashboard } from "lucide-react";
import ProjectsManager from "./ProjectsManager";
import LeadsManager from "./LeadsManager";

const tabs = [
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "leads", label: "Leads", icon: Inbox },
];

export default function AdminDashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogout = async () => {
    await logout();
    navigate("/admin"); // redirect after logout
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <LayoutDashboard size={18} className="text-gold-400" />
              <h1 className="font-display text-2xl font-bold text-white">
                Admin Dashboard
              </h1>
            </div>
            <p className="text-gray-500 text-sm">Logged in as: {user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-red-400 glass transition-all"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 p-1 rounded-2xl glass w-fit">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === id
                  ? "bg-gold-500 text-ink-900 font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "leads" && <LeadsManager />}
      </div>
    </div>
  );
}
