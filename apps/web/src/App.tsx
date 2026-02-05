import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Requests } from './pages/Requests';
import { Audit } from './pages/Audit';
import { Payments } from './pages/Payments';
import { Knowledge } from './pages/Knowledge';
import { Integrations } from './pages/Integrations';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Layout />;
};

function AppRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="audit" element={<Audit />} />
          <Route path="payments" element={<Payments />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="integrations" element={<Integrations />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
