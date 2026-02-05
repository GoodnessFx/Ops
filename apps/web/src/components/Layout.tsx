import { useState, useEffect } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  ShieldCheck, 
  CreditCard, 
  Book, 
  Settings, 
  Activity, 
  Menu,
  X,
  Search,
  Bell,
  LogOut
} from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from './Button';
import { Input } from './Input';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const links = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/requests', icon: MessageSquare, label: 'Requests' },
    { to: '/audit', icon: ShieldCheck, label: 'Audit Logs' },
    { to: '/payments', icon: CreditCard, label: 'Payments' },
    { to: '/knowledge', icon: Book, label: 'Knowledge Base' },
    { to: '/integrations', icon: Settings, label: 'Integrations' },
  ];

  useEffect(() => {
    // Fetch notifications
    fetch('http://localhost:3000/notifications')
      .then(res => res.json())
      .then(data => setNotifications(data))
      .catch(err => console.error('Failed to fetch notifications', err));
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground font-sans">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-72 border-r bg-card transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center gap-2 border-b px-6 font-bold text-xl tracking-tight text-primary">
          <Activity className="h-6 w-6" />
          <span>Ops OS</span>
          <button 
            className="ml-auto lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4">
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold ring-2 ring-background uppercase">
              {user?.name?.slice(0, 2) || 'AD'}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="truncate text-sm font-medium">{user?.name || 'Admin User'}</div>
              <div className="truncate text-xs text-muted-foreground">{user?.email || 'admin@ops.os'}</div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex-1 max-w-xl">
             <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search anything..." 
                  className="pl-9 bg-muted/50 border-none focus-visible:bg-background transition-colors"
                />
             </div>
          </div>

          <div className="ml-auto flex items-center gap-2 relative">
             <Button variant="ghost" size="icon" onClick={() => setNotificationsOpen(!notificationsOpen)}>
               <Bell className="h-5 w-5" />
               {notifications.some(n => !n.read) && (
                 <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500" />
               )}
             </Button>

             {notificationsOpen && (
                 <div className="absolute right-0 top-16 w-80 bg-card border rounded-lg shadow-lg z-50 overflow-hidden bg-white dark:bg-slate-950">
                     <div className="p-3 border-b font-semibold text-sm">Notifications</div>
                     <div className="max-h-80 overflow-y-auto">
                         {notifications.length === 0 ? (
                             <div className="p-4 text-center text-sm text-muted-foreground">No notifications</div>
                         ) : (
                             notifications.map(n => (
                                 <div key={n.id} className={cn("p-3 border-b last:border-0 hover:bg-muted/50 cursor-pointer", !n.read && "bg-primary/5")}>
                                     <div className="flex justify-between items-start mb-1">
                                         <span className="font-medium text-sm">{n.title}</span>
                                         <span className="text-xs text-muted-foreground">{n.time}</span>
                                     </div>
                                     <p className="text-xs text-muted-foreground line-clamp-2">{n.message}</p>
                                 </div>
                             ))
                         )}
                     </div>
                 </div>
             )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
