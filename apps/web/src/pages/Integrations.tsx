import { useState, useEffect } from "react"
import { Badge } from "@/components/Badge"
import { Button } from "@/components/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/Card"
import { Check, Plus } from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface Integration {
    id: string;
    name: string;
    description: string;
    connected: boolean;
    icon: string;
}

export function Integrations() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetch('http://localhost:4000/integrations', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) setIntegrations(data);
    })
    .catch(err => console.error(err));
  }, [token]);

  const toggle = (id: string) => {
    fetch(`http://localhost:4000/integrations/${id}/toggle`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            setIntegrations(prev => prev.map(i => i.id === id ? { ...i, connected: data.connected } : i));
        }
    })
    .catch(err => console.error(err));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <p className="text-muted-foreground">Connect your tools to automate workflows.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {integrations.length === 0 ? (
             <div className="col-span-3 text-center text-muted-foreground py-12">
                 Loading integrations...
             </div>
        ) : integrations.map((tool) => (
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
              {tool.connected ? (
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
                variant={tool.connected ? "outline" : "default"} 
                className="w-full"
                onClick={() => toggle(tool.id)}
              >
                {tool.connected ? (
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
