import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/Card"
import { Input } from "@/components/Input"
import { Search, FileText, ExternalLink } from "lucide-react"
import { useAuth } from "../context/AuthContext"

interface Article {
    id: number | string;
    title: string;
    category: string;
    reads: string;
    updated: string;
}

export function Knowledge() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [search, setSearch] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    fetch('http://localhost:4000/knowledge/articles', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => {
        if (Array.isArray(data)) setArticles(data);
    })
    .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Knowledge Base</h2>
          <p className="text-muted-foreground">Find answers and documentation.</p>
        </div>
        <div className="relative w-full md:w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search articles..." 
            className="pl-8" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.filter(article => 
            article.title.toLowerCase().includes(search.toLowerCase()) || 
            article.category.toLowerCase().includes(search.toLowerCase())
        ).length === 0 ? (
            <div className="col-span-3 text-center text-muted-foreground py-12">
                No articles found.
            </div>
        ) : articles.filter(article => 
            article.title.toLowerCase().includes(search.toLowerCase()) || 
            article.category.toLowerCase().includes(search.toLowerCase())
        ).map((article) => (
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
