"use client";

import Image from "next/image";
import { Card } from "@/components/ui/Card";
import {
  BarChart3,
  ShoppingBag,
  Users2,
  Lightbulb,
  Target,
  Globe,
} from "lucide-react";

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
    description:
      "Discover eco-friendly products and brands. Make informed choices with our sustainability ratings.",
  },
  {
    icon: Users2,
    title: "Community Challenges",
    description:
      "Join global initiatives and compete with friends to reduce waste and carbon emissions together.",
  },
  {
    icon: Lightbulb,
    title: "Smart Recommendations",
    description:
      "AI-powered suggestions for reducing your environmental impact in everyday activities.",
  },
  {
    icon: Target,
    title: "Goal Setting",
    description:
      "Set and achieve sustainability goals with our guided programs and milestone tracking.",
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "See your contribution to worldwide environmental efforts and connect with eco-warriors globally.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-32">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/feat.jpg"
          alt="Features background"
          layout="fill"
          objectFit="cover"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="from-background/50 via-background/80 to-background absolute inset-0 bg-gradient-to-b" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up mx-auto mb-16 max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold text-balance sm:text-5xl lg:text-6xl">
            Everything You Need to{" "}
            <span className="text-primary">Go Green</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty sm:text-xl">
            Powerful tools and features designed to make sustainable living
            simple, measurable, and rewarding.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:border-green-500/50 group animate-scale-in border-2 border-green-500/50 bg-white/10 backdrop-blur-xl p-8 text-white/80 transition-all duration-300 hover:shadow-xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-green-500 group-hover:bg-primary mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110">
                <feature.icon className="text-primary group-hover:text-primary-foreground h-7 w-7 transition-colors" />
              </div>
              <h3 className="text-card-foreground mb-3 text-xl font-bold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-gray-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
