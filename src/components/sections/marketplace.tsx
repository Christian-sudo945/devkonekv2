"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Package, Clock, DollarSign, MessageSquare, Code, Eye, ThumbsUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useScroll } from "@/hooks/use-scroll";
import { cn } from "@/utils/cn";

export function MarketplaceSection() {
  const { isCompact } = useScroll();
  const items = [
    {
      id: 1,
      title: "E-commerce Template",
      description: "Next.js + Tailwind CSS template with dark mode",
      price: "$49",
      category: "Template",
      timeLeft: "3 days left",
      type: "Featured",
      developer: {
        name: "Christian Emmanuel",
        avatar: "CE",
        rating: 4.8,
        verified: true
      },
      likes: 124,
      preview: `
const Header = () => {
  return (
    <nav className="flex items-center">
      <Logo />
      <SearchBar />
    </nav>
  );
};`
    },
   
  ];

  return (
    <div className="space-y-0">
      <div className={cn(
        "section-wrapper scrolled-spacing",
        isCompact ? "scrolled-compact" : "scrolled-normal"
      )}>
        <header className={cn(
          "section-header",
          isCompact ? "scrolled-compact" : "scrolled-normal"
        )}>
          <div className="w-full flex gap-0.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search..." className="search-input" />
            </div>
            <button className="filter-button">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </header>

        <div className={cn(
          "grid",
          isCompact ? "gap-0.5 mt-0.5" : "gap-2 mt-2"
        )}>
          {items.map((item) => (
            <Card key={item.id} className="card-base p-1.5">
              <div className="space-y-1">
                <div className="flex justify-between items-start gap-2">
                  <div className="flex items-start gap-3 flex-1">
                    <Package className="h-8 w-8 text-blue-500 shrink-0 mt-1" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold truncate">{item.title}</h3>
                        <Badge variant="secondary" className="shrink-0">{item.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                  <div className="font-semibold text-green-500 whitespace-nowrap">
                    {item.price}
                  </div>
                </div>

                <div className="bg-gray-950 rounded-md p-1.5 text-xs">
                  <pre className="text-gray-200 overflow-x-auto">
                    <code>{item.preview}</code>
                  </pre>
                </div>

                <div className="flex items-center justify-between pt-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">
                        {item.developer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-muted-foreground">
                      by <span className="text-foreground">{item.developer.name}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {item.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {item.timeLeft}
                    </span>
                  </div>
                </div>

                <div className="flex gap-0.5 pt-1 border-t border-gray-200/10">
                  <Button className="flex-1" variant="default">
                    Buy Now
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
