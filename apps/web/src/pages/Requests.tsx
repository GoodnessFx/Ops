import { useState, useEffect } from 'react';
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, Filter, X } from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface Request {
  id: string;
  subject: string;
  user: string;
  status: string;
  priority: string;
  date: string;
}

export function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [search, setSearch] = useState('');

  const fetchRequests = () => {
    fetch('http://localhost:4000/requests', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) {
            setRequests(data);
        }
    })
    .catch(err => console.error(err));
  };

  useEffect(() => {
    if (token) fetchRequests();
  }, [token]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('http://localhost:4000/requests', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ subject: newSubject, priority: newPriority })
    })
    .then(res => res.json())
    .then(() => {
        setIsModalOpen(false);
        setNewSubject('');
        setNewPriority('Medium');
        fetchRequests();
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="space-y-6 relative">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="bg-card border rounded-lg shadow-lg w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">New Request</h3>
                    <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Subject</label>
                        <Input 
                            value={newSubject} 
                            onChange={(e) => setNewSubject(e.target.value)} 
                            placeholder="Describe your request..." 
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Priority</label>
                        <select 
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={newPriority}
                            onChange={(e) => setNewPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                            <option value="Critical">Critical</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit">Submit Request</Button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Requests</h2>
          <p className="text-muted-foreground">Manage and track support tickets and feature requests.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>New Request</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Requests</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search requests..." 
                  className="pl-8 w-[250px]" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Subject</th>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Priority</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.filter(req => 
                    req.subject.toLowerCase().includes(search.toLowerCase()) || 
                    req.user.toLowerCase().includes(search.toLowerCase()) ||
                    req.id.includes(search)
                ).length === 0 ? (
                    <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                            No requests found.
                        </td>
                    </tr>
                ) : requests.filter(req => 
                    req.subject.toLowerCase().includes(search.toLowerCase()) || 
                    req.user.toLowerCase().includes(search.toLowerCase()) ||
                    req.id.includes(search)
                ).map((req) => (
                  <tr key={req.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{req.id.substring(0, 8)}</td>
                    <td className="px-4 py-3 font-medium">{req.subject}</td>
                    <td className="px-4 py-3 text-muted-foreground">{req.user}</td>
                    <td className="px-4 py-3">
                      <Badge variant={
                        req.status === 'Open' ? 'default' : 
                        req.status === 'In Progress' ? 'warning' : 'secondary'
                      }>
                        {req.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={
                        req.priority === 'Critical' ? 'text-red-500 border-red-500/30' : 
                        req.priority === 'High' ? 'text-orange-500 border-orange-500/30' : 
                        'text-muted-foreground'
                      }>
                        {req.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{req.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
