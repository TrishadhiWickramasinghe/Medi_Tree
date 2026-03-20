import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import Login from './pages/Login';
import Dashboard from './pages/staff/Dashboard';
import Queue from './pages/staff/Queue';
import AddPatient from './pages/staff/AddPatient';
import PatientDetail from './pages/staff/PatientDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import StaffManagement from './pages/admin/StaffManagement';
import AuditLog from './pages/admin/AuditLog';
import AlertConfig from './pages/admin/AlertConfig';
import Reports from './pages/admin/Reports';
import { useAuth } from './hooks/useAuth';

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gray-50">
    <AlertBanner />
    <Navbar />
    <main>{children}</main>
  </div>
);

function App() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          isAuthenticated
            ? <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />
            : <Login />
        } />

        {/* Staff routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
        <Route path="/queue" element={<ProtectedRoute><Layout><Queue /></Layout></ProtectedRoute>} />
        <Route path="/add-patient" element={<ProtectedRoute><Layout><AddPatient /></Layout></ProtectedRoute>} />
        <Route path="/patients/:id" element={<ProtectedRoute><Layout><PatientDetail /></Layout></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute adminOnly><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
        <Route path="/admin/staff" element={<ProtectedRoute adminOnly><Layout><StaffManagement /></Layout></ProtectedRoute>} />
        <Route path="/admin/logs" element={<ProtectedRoute adminOnly><Layout><AuditLog /></Layout></ProtectedRoute>} />
        <Route path="/admin/alerts" element={<ProtectedRoute adminOnly><Layout><AlertConfig /></Layout></ProtectedRoute>} />
        <Route path="/admin/reports" element={<ProtectedRoute adminOnly><Layout><Reports /></Layout></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;