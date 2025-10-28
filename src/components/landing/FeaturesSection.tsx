"use client"

import { Card } from "@/components/ui/Card"
import { BarChart3, ShoppingBag, Users2, Lightbulb, Target, Globe } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Carbon Footprint Tracking",
    description:
      "Monitor your daily environmental impact with our advanced analytics dashboard and get personalized insights.",
  },
  {
    icon: ShoppingBag,
    title: "Sustainable Shopping",
    description: "Discover eco-friendly products and brands. Make informed choices with our sustainability ratings.",
  },
  {
    icon: Users2,
    title: "Community Challenges",
    description: "Join global initiatives and compete with friends to reduce waste and carbon emissions together.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description: "AI-powered suggestions for reducing your environmental impact in everyday activities.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Set and achieve sustainability goals with our guided programs and milestone tracking.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description: "See your contribution to worldwide environmental efforts and connect with eco-warriors globally.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance mb-6">
            Everything You Need to <span className="text-primary">Go Green</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-pretty leading-relaxed">
            Powerful tools and features designed to make sustainable living simple, measurable, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group animate-scale-in bg-white/80 text-green-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
