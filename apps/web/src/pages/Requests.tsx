import { useState, useEffect } from 'react';
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, Filter, MoreHorizontal } from "lucide-react"
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

  useEffect(() => {
    fetch('http://localhost:3000/requests', {
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
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Requests</h2>
          <p className="text-muted-foreground">Manage and track support tickets and feature requests.</p>
        </div>
        <Button>New Request</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Requests</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search requests..." className="pl-8 w-[250px]" />
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
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {requests.length === 0 ? (
                    <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">
                            No requests found.
                        </td>
                    </tr>
                ) : requests.map((req) => (
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
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
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
