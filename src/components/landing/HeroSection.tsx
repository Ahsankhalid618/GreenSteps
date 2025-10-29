"use client";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Green.webp"
          alt="Green forest background"
          fill
          className="h-full w-full object-cover opacity-50"
        />
        <div className="from-background/50 via-background/80 to-background absolute inset-0 bg-gradient-to-b" />
      </div>

      {/* Floating Elements */}
      <div className="bg-primary/10 animate-float absolute top-1/4 left-1/4 h-64 w-64 rounded-full blur-3xl" />
      <div
        className="bg-accent/10 animate-float absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in-up mx-auto max-w-5xl space-y-8 text-center">
          {/* Badge */}
          <div className="glass-effect text-foreground inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="text-primary h-4 w-4" />
            <span>Join the sustainability revolution</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl leading-tight font-bold text-balance sm:text-6xl lg:text-4xl xl:text-6xl">
            Take{" "}
            <span className="text-primary relative inline-block">
              Green Steps
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="12"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 5 100 2 150 5C200 8 250 7 298 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-primary"
                />
              </svg>
            </span>{" "}
            Toward a Sustainable Future
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground mx-auto max-w-4xl text-lg leading-relaxed text-pretty sm:text-xl lg:text-2xl">
            Empowering individuals and businesses to make eco-conscious
            decisions. Track your carbon footprint, discover sustainable
            alternatives, and join a community committed to protecting our
            planet.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
            <button className="group relative min-w-[200px] transform overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl">
              <span className="relative z-10 flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <button className="group text-foreground min-w-[200px] transform rounded-xl border-2 border-white/20 bg-transparent px-8 py-4 font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10">
              <span className="flex items-center justify-center">
                Learn More
              </span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="text-muted-foreground flex flex-wrap items-center justify-center gap-8 pt-12 text-sm">
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              <span>50K+ Active Users</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              <span>1M+ Trees Planted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-primary h-2 w-2 animate-pulse rounded-full" />
              <span>Carbon Neutral Certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
