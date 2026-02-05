import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, Filter, MoreHorizontal } from "lucide-react"

const requests = [
  { id: "REQ-1024", subject: "Unable to reset password", user: "alice@example.com", status: "Open", priority: "High", date: "2024-03-10" },
  { id: "REQ-1023", subject: "Billing question for March", user: "bob@company.co", status: "In Progress", priority: "Medium", date: "2024-03-09" },
  { id: "REQ-1022", subject: "Feature request: Dark mode", user: "charlie@design.io", status: "Closed", priority: "Low", date: "2024-03-08" },
  { id: "REQ-1021", subject: "API Rate limit exceeded", user: "dev@startup.com", status: "Open", priority: "Critical", date: "2024-03-08" },
  { id: "REQ-1020", subject: "Integration with Slack failing", user: "ops@corp.net", status: "In Progress", priority: "High", date: "2024-03-07" },
  { id: "REQ-1019", subject: "Update credit card info", user: "finance@llc.com", status: "Closed", priority: "Medium", date: "2024-03-06" },
  { id: "REQ-1018", subject: "Export data not working", user: "data@analyst.org", status: "Open", priority: "Medium", date: "2024-03-05" },
]

export function Requests() {
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
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-mono text-muted-foreground">{req.id}</td>
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
