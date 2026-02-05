import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, FileText, ExternalLink } from "lucide-react"

const articles = [
  { id: 1, title: "Getting Started with Ops OS", category: "Onboarding", reads: "1.2k", updated: "2 days ago" },
  { id: 2, title: "Configuring Email Integrations", category: "Integrations", reads: "854", updated: "1 week ago" },
  { id: 3, title: "Understanding Payment Flows", category: "Payments", reads: "2.1k", updated: "3 weeks ago" },
  { id: 4, title: "API Authentication Guide", category: "Developer", reads: "3.4k", updated: "1 month ago" },
  { id: 5, title: "Troubleshooting Worker Nodes", category: "Operations", reads: "543", updated: "2 days ago" },
  { id: 6, title: "Managing User Roles", category: "Administration", reads: "921", updated: "5 days ago" },
]

export function Knowledge() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
          <p className="text-muted-foreground">Find answers and documentation.</p>
        </div>
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search articles..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Card key={article.id} className="hover:border-primary/50 transition-all cursor-pointer group">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-md bg-primary/10 text-primary">
                  <FileText className="h-5 w-5" />
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <CardTitle className="mt-4 text-lg">{article.title}</CardTitle>
              <CardDescription>{article.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground flex justify-between pt-2 border-t">
                <span>{article.reads} reads</span>
                <span>Updated {article.updated}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
