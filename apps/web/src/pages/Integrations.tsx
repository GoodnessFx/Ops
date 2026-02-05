import { useState } from "react"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Check, Plus } from "lucide-react"

const integrations = [
  { id: "slack", name: "Slack", description: "Send notifications to Slack channels.", connected: true, icon: "S" },
  { id: "hubspot", name: "HubSpot", description: "Sync contacts and deals with CRM.", connected: false, icon: "H" },
  { id: "stripe", name: "Stripe", description: "Process payments and subscriptions.", connected: true, icon: "St" },
  { id: "github", name: "GitHub", description: "Link commits to deployment events.", connected: false, icon: "G" },
  { id: "sendgrid", name: "SendGrid", description: "Transactional email service.", connected: false, icon: "Se" },
  { id: "aws", name: "AWS CloudWatch", description: "Monitor infrastructure metrics.", connected: true, icon: "A" },
]

export function Integrations() {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    integrations.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.connected }), {})
  )

  const toggle = (id: string) => {
    setConnected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">Connect your tools to automate workflows.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((tool) => (
          <Card key={tool.id} className="flex flex-col">
            <CardHeader className="flex-row items-start justify-between space-y-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                  {tool.icon}
                </div>
                <div>
                  <CardTitle className="text-base">{tool.name}</CardTitle>
                </div>
              </div>
              {connected[tool.id] ? (
                <Badge variant="success" className="ml-auto">Connected</Badge>
              ) : (
                <Badge variant="outline" className="ml-auto">Not Connected</Badge>
              )}
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                variant={connected[tool.id] ? "outline" : "default"} 
                className="w-full"
                onClick={() => toggle(tool.id)}
              >
                {connected[tool.id] ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Configure
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Connect
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
