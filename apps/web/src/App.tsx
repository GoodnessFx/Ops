import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Requests } from './pages/Requests';
import { Audit } from './pages/Audit';
import { Payments } from './pages/Payments';
import { Knowledge } from './pages/Knowledge';
import { Integrations } from './pages/Integrations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="requests" element={<Requests />} />
          <Route path="audit" element={<Audit />} />
          <Route path="payments" element={<Payments />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="integrations" element={<Integrations />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
