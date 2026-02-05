import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, ShieldCheck, CreditCard, Book, Settings, Activity } from 'lucide-react';
import clsx from 'clsx';

function Sidebar() {
  const location = useLocation();
  
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/requests', icon: MessageSquare, label: 'Requests' },
    { to: '/audit', icon: ShieldCheck, label: 'Audit Logs' },
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/knowledge', icon: Book, label: 'Knowledge Base' },
    { to: '/integrations', icon: Settings, label: 'Integrations' },
  ];

  return (
    <div className="w-64 bg-secondary border-r border-slate-800 h-screen flex flex-col">
      <div className="p-6 flex items-center gap-2 text-accent font-bold text-xl">
        <Activity className="h-6 w-6" />
        <span>Ops OS</span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={clsx(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
              location.pathname === link.to
                ? "bg-accent/10 text-accent"
                : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
            AD
          </div>
          <div className="text-sm">
            <div className="text-slate-200">Admin User</div>
            <div className="text-slate-500 text-xs">admin@ops.os</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Requests', value: '1,234', change: '+12%', color: 'bg-blue-500/10 text-blue-500' },
          { label: 'Active Issues', value: '56', change: '-5%', color: 'bg-red-500/10 text-red-500' },
          { label: 'Revenue', value: '$45,200', change: '+8%', color: 'bg-green-500/10 text-green-500' },
        ].map((stat) => (
          <div key={stat.label} className="bg-secondary p-6 rounded-xl border border-slate-800">
            <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className={clsx("text-xs font-medium px-2 py-1 rounded-full", stat.color)}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded-xl border border-slate-800 h-96">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-800 rounded-lg transition-colors">
                <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">New support request received</div>
                  <div className="text-xs text-slate-500">2 minutes ago</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-secondary p-6 rounded-xl border border-slate-800 h-96">
          <h2 className="text-xl font-bold mb-4">System Status</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span>API Status</span>
                <span className="text-green-500 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Operational</span>
             </div>
             <div className="flex items-center justify-between">
                <span>Worker Status</span>
                <span className="text-green-500 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Operational</span>
             </div>
             <div className="flex items-center justify-between">
                <span>Database</span>
                <span className="text-green-500 flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div> Operational</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Requests() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Requests</h1>
      <div className="bg-secondary rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-sm text-slate-400">
          <thead className="bg-slate-900 text-slate-200 uppercase font-medium">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Subject</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {[
              { id: 'REQ-001', subject: 'Cannot access account', status: 'Open', date: '2024-03-01' },
              { id: 'REQ-002', subject: 'Billing inquiry', status: 'In Progress', date: '2024-03-02' },
              { id: 'REQ-003', subject: 'Feature request: Dark mode', status: 'Closed', date: '2024-03-03' },
            ].map((row) => (
              <tr key={row.id} className="hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-slate-500">{row.id}</td>
                <td className="px-6 py-4 text-slate-200">{row.subject}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    row.status === 'Open' ? 'bg-blue-500/10 text-blue-500' :
                    row.status === 'In Progress' ? 'bg-yellow-500/10 text-yellow-500' :
                    'bg-green-500/10 text-green-500'
                  )}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <div className="bg-secondary p-12 rounded-xl border border-slate-800 text-center text-slate-500">
        This page is under construction.
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-primary text-slate-100 font-sans">
        <Sidebar />
        <main className="flex-1 overflow-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/requests" element={<Requests />} />
            <Route path="/audit" element={<Placeholder title="Audit Logs" />} />
            <Route path="/payments" element={<Placeholder title="Payments" />} />
            <Route path="/knowledge" element={<Placeholder title="Knowledge Base" />} />
            <Route path="/integrations" element={<Placeholder title="Integrations" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
