import { Badge } from "@/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, AlertCircle, CheckCircle2, XCircle } from "lucide-react"

const logs = [
  { id: "LOG-5521", action: "User Login", actor: "admin@ops.os", ip: "192.168.1.1", status: "Success", time: "2 mins ago" },
  { id: "LOG-5520", action: "Update Settings", actor: "admin@ops.os", ip: "192.168.1.1", status: "Success", time: "15 mins ago" },
  { id: "LOG-5519", action: "Failed Login", actor: "unknown@ip", ip: "45.33.22.11", status: "Failed", time: "1 hour ago" },
  { id: "LOG-5518", action: "Delete Request", actor: "manager@ops.os", ip: "10.0.0.5", status: "Success", time: "2 hours ago" },
  { id: "LOG-5517", action: "API Key Created", actor: "dev@ops.os", ip: "10.0.0.12", status: "Success", time: "5 hours ago" },
  { id: "LOG-5516", action: "Payment Refund", actor: "system", ip: "internal", status: "Warning", time: "1 day ago" },
]

export function Audit() {
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
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  {log.status === 'Success' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  {log.status === 'Failed' && <XCircle className="h-5 w-5 text-red-500" />}
                  {log.status === 'Warning' && <AlertCircle className="h-5 w-5 text-yellow-500" />}
                  <div>
                    <div className="font-medium">{log.action}</div>
                    <div className="text-xs text-muted-foreground">
                      by <span className="font-mono text-primary">{log.actor}</span> • {log.ip}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="font-mono text-xs">{log.id}</Badge>
                  <span className="text-sm text-muted-foreground w-24 text-right">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
