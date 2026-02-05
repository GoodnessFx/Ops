import { useState, useEffect } from 'react';
import { Badge } from "@/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, AlertCircle, CheckCircle2, XCircle } from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface AuditLog {
  id: string;
  actorType: string;
  actorId: string;
  action: string;
  reasoning: string | null;
  createdAt: string;
  payload: string | null;
}

export function Audit() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch('http://localhost:4000/audit/logs', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) {
            setLogs(data);
        }
    })
    .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Audit Logs</h2>
        <p className="text-muted-foreground">Track system security and operational events.</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>System Activity</CardTitle>
            <div className="relative w-[300px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search logs..." className="pl-8" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">No audit logs found.</div>
            ) : logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  {/* Heuristic for icon based on action name */}
                  {(log.action.includes('success') || log.action.includes('created') || log.action.includes('completed')) ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                  ) : (log.action.includes('fail') || log.action.includes('error')) ? (
                      <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                  )}
                  
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-xs text-muted-foreground">
                      by <span className="font-mono text-primary">{log.actorId}</span> ({log.actorType})
                    </div>
                    {log.reasoning && (
                        <div className="text-xs text-muted-foreground mt-0.5 italic">
                            {log.reasoning}
                        </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="font-mono text-xs hidden sm:inline-flex">{log.id.substring(0, 8)}</Badge>
                  <span className="text-sm text-muted-foreground w-32 text-right">
                      {new Date(log.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
