import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? 'text-white bg-slate-800 font-semibold'
      : 'text-slate-400 hover:text-white hover:bg-slate-800/50';

  return (
    <nav className="bg-slate-900 border-b border-slate-800 px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">M</div>
            <span className="text-lg font-bold text-white">MediTree</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {!isAdmin && (
              <>
                <Link to="/dashboard" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/dashboard')}`}>Dashboard</Link>
                <Link to="/queue" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/queue')}`}>Queue</Link>
                <Link to="/add-patient" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/add-patient')}`}>Add Patient</Link>
              </>
            )}
            {isAdmin && (
              <>
                <Link to="/admin" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/admin')}`}>Overview</Link>
                <Link to="/admin/staff" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/admin/staff')}`}>Staff</Link>
                <Link to="/admin/logs" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/admin/logs')}`}>Audit Logs</Link>
                <Link to="/admin/alerts" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/admin/alerts')}`}>Alert Config</Link>
                <Link to="/admin/reports" className={`px-3 py-1.5 rounded-lg transition-all ${isActive('/admin/reports')}`}>Reports</Link>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-lg">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold">
              {user?.name?.charAt(0)}
            </div>
            <span className="text-slate-300">{user?.name}</span>
            <span className={`badge ${isAdmin ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
              {user?.role}
            </span>
          </div>
          <button onClick={signOut} className="text-slate-400 hover:text-red-400 transition-colors px-2 py-1.5 rounded-lg hover:bg-slate-800">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;