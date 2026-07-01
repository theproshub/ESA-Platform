"use client";

import { useState } from "react";
import { Megaphone, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { announcements } from "@/lib/data";

const priorityStyles = {
  urgent: "bg-red-100 text-red-800",
  high: "bg-amber-100 text-amber-800",
  medium: "bg-blue-100 text-blue-800",
  low: "bg-stone-100 text-stone-700",
};

const categoryStyles: Record<string, string> = {
  Meeting: "bg-violet-100 text-violet-800",
  Finance: "bg-emerald-100 text-emerald-800",
  Academic: "bg-blue-100 text-blue-800",
  Events: "bg-amber-100 text-amber-800",
};

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
}

export default function AnnouncementsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const categories = [...new Set(announcements.map((a) => a.category))];

  const filtered = announcements.filter((ann) => {
    const matchesSearch =
      search === "" ||
      ann.title.toLowerCase().includes(search.toLowerCase()) ||
      ann.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || ann.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold sm:text-3xl">Announcements</h1>
        <p className="mt-2 text-muted-foreground">
          Official notices and updates from the association.
        </p>
      </header>

      <div className="flex flex-col gap-4 sm:flex-row" role="search" aria-label="Filter announcements">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            placeholder="Search announcements..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search announcements"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter("all")}
            aria-pressed={categoryFilter === "all"}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              categoryFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "border bg-card text-muted-foreground hover:bg-secondary"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              aria-pressed={categoryFilter === cat}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                categoryFilter === cat
                  ? "bg-primary text-primary-foreground"
                  : "border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((ann) => (
              <article
                key={ann.id}
                className="rounded-lg border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={priorityStyles[ann.priority]}>
                        {ann.priority}
                      </Badge>
                      <Badge
                        className={
                          categoryStyles[ann.category] ||
                          "bg-stone-100 text-stone-700"
                        }
                      >
                        {ann.category}
                      </Badge>
                    </div>
                    <h3 className="mt-3 font-serif text-xl font-semibold leading-snug">
                      {ann.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      {ann.content}
                    </p>
                  </div>
                  <time className="shrink-0 text-sm text-muted-foreground">
                    {timeAgo(ann.createdAt)}
                  </time>
                </div>
                <footer className="mt-4 flex items-center gap-2 border-t pt-3 text-sm text-muted-foreground">
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-xs font-semibold"
                    aria-hidden="true"
                  >
                    {ann.author[0]}
                  </div>
                  {ann.author}
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border bg-card py-16 text-center">
            <Megaphone
              className="h-10 w-10 text-muted-foreground/40"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="mt-4 text-lg font-medium">No announcements found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
