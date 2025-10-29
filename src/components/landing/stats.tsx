"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, Users, Leaf, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Community Members",
  },
  {
    icon: Leaf,
    value: 1000000,
    suffix: "+",
    label: "Trees Planted Worldwide",
  },
  {
    icon: TrendingUp,
    value: 75,
    suffix: "%",
    label: "Carbon Reduction Average",
  },
  {
    icon: Award,
    value: 100,
    suffix: "+",
    label: "Partner Organizations",
  },
]

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0
          const duration = 2000
          const increment = end / (duration / 16)

          const timer = setInterval(() => {
            start += increment
            if (start >= end) {
              setCount(end)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.5 },
    )

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [end])

  return (
    <span ref={countRef}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function Stats() {
  return (
    <section className="py-20 sm:py-32 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="backdrop-blur-xl border-2 border-white/20 bg-white/10 text-primary rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 animate-scale-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-green-500 mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl xl:text-3xl sm:text-5xl font-bold text-foreground mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm text-muted-foreground text-gray-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
