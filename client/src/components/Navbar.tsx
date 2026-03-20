import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600';

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-blue-700">MediTree</span>
          <div className="flex items-center gap-6 text-sm">
            {!isAdmin && (
              <>
                <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>
                <Link to="/queue" className={isActive('/queue')}>Queue</Link>
                <Link to="/add-patient" className={isActive('/add-patient')}>Add Patient</Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" className={isActive('/admin')}>Overview</Link>
                <Link to="/admin/staff" className={isActive('/admin/staff')}>Staff</Link>
                <Link to="/admin/logs" className={isActive('/admin/logs')}>Audit Logs</Link>
                <Link to="/admin/alerts" className={isActive('/admin/alerts')}>Alert Config</Link>
                <Link to="/admin/reports" className={isActive('/admin/reports')}>Reports</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-gray-500">
            {user?.name}
            <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium ${
              isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {user?.role}
            </span>
          </span>
          <button
            onClick={signOut}
            className="text-gray-500 hover:text-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
