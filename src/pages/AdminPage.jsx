import { useAuth } from "../context/AdminContext";
import AdminLogin from "../components/admin/AdminLogin";
import AdminDashboard from "../components/admin/AdminDashboard";

export default function AdminPage() {
  const { user } = useAuth();

  return user ? <AdminDashboard /> : <AdminLogin />;
}
