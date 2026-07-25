"use client";

import { useState } from "react";
import { Megaphone, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageHeader } from "@/components/page-header";
import { PriorityBadge } from "@/components/priority-badge";
import { EmptyState } from "@/components/empty-state";
import { announcements } from "@/lib/data";

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
    <div className="space-y-5 sm:space-y-8">
      <PageHeader
        title="Announcements"
        description="Official notices and updates from the association."
      />

      <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-row sm:gap-4" role="search" aria-label="Filter announcements">
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
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <button
            onClick={() => setCategoryFilter("all")}
            aria-pressed={categoryFilter === "all"}
            className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-3 sm:text-sm ${
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
              className={`rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors sm:px-3 sm:text-sm ${
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
          <div className="space-y-3 sm:space-y-4">
            {filtered.map((ann) => (
              <article
                key={ann.id}
                className="rounded-lg border bg-card p-3.5 sm:p-5"
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                      <PriorityBadge priority={ann.priority} />
                      <Badge
                        className={`text-[11px] sm:text-xs ${
                          categoryStyles[ann.category] ||
                          "bg-stone-100 text-stone-700"
                        }`}
                      >
                        {ann.category}
                      </Badge>
                    </div>
                    <h3 className="mt-2 font-serif text-base font-semibold leading-snug sm:mt-3 sm:text-xl">
                      {ann.title}
                    </h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground sm:mt-2 sm:text-base">
                      {ann.content}
                    </p>
                  </div>
                  <time className="shrink-0 text-[12px] text-muted-foreground sm:text-sm">
                    {timeAgo(ann.createdAt)}
                  </time>
                </div>
                <footer className="mt-3 flex items-center gap-2 border-t pt-2.5 text-[13px] text-muted-foreground sm:mt-4 sm:pt-3 sm:text-sm">
                  <div
                    className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold sm:h-6 sm:w-6 sm:text-xs"
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
          <EmptyState
            icon={Megaphone}
            title="No announcements found"
            description="Try adjusting your search or filters."
          />
        )}
      </div>
    </div>
  );
}
