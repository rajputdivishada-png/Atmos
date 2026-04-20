"use client"

import { Sparkles, Sun, Clock, Shirt, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { useApp } from "@/components/providers"

export function AIBriefing() {
  const { weather, weatherLoading } = useApp()
  const data = weather?.insights

  if (weatherLoading || !weather) {
    return (
      <div className="rounded-2xl bg-card border border-border p-8 flex items-center justify-center min-h-[200px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground animate-pulse">Consulting Atmos AI...</p>
        </div>
      </div>
    )
  }

  const tips = [
    {
      icon: Sun,
      title: "Morning Tip",
      content: data?.morningTip || "Standard morning routine recommended.",
      color: "text-primary"
    },
    {
      icon: Clock,
      title: "Outdoor Window",
      content: data?.outdoorWindow || "Conditions are generally stable today.",
      color: "text-secondary"
    },
    {
      icon: Shirt,
      title: "Clothing Tip",
      content: data?.clothingTip || "Wear comfortable casual attire.",
      color: "text-success"
    }
  ]


  return (
    <div className="rounded-2xl bg-card border border-border p-6 hover-glow-amber transition-all animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-balance">Atmos AI Advisor</h2>
            <p className="text-xs text-muted-foreground">Dynamic environmental intelligence</p>
          </div>
        </div>
        
        {/* Risk Badge */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all",
          data?.riskLevel === "HIGH RISK" 
            ? "bg-destructive/10 border-destructive/20 text-destructive" 
            : "bg-success/10 border-success/20 text-success"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full animate-pulse-dot",
            data?.riskLevel === "HIGH RISK" ? "bg-destructive" : "bg-success"
          )} />
          <span className="text-xs font-semibold uppercase tracking-wider">{data?.riskLevel || "LOW RISK"}</span>
        </div>
      </div>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {tips.map((tip, index) => (
          <div 
            key={tip.title}
            className="p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-all flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <tip.icon className={cn("w-4 h-4", tip.color)} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{tip.title}</span>
            </div>
            <p className="text-sm text-foreground leading-snug">{tip.content}</p>
          </div>
        ))}
      </div>

      {/* Summary Insight */}
      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-sm italic text-muted-foreground border-l-2 border-primary/50 pl-3">
          {data?.summary || "Analyzing local atmospheric trends for personalized insights..."}
        </p>
      </div>
    </div>
  )
}
