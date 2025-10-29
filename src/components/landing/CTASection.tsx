"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src="/meadow.jpg"
          alt="Nature background"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-effect animate-fade-in-up mx-auto max-w-4xl space-y-8 rounded-3xl p-12 text-center sm:p-16">
          <h2 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
            Ready to Make a{" "}
            <span className="text-primary">Positive Impact?</span>
          </h2>
          <p className="text-muted-foreground mx-auto max-w-4xl text-lg leading-relaxed text-pretty sm:text-xl">
            Join thousands of eco-conscious individuals and start your
            sustainability journey today. It&apos;s free to get started.
          </p>
          <div className="flex flex-col items-center justify-center gap-6 pt-8 sm:flex-row">
            <button className="group relative min-w-[220px] transform overflow-hidden rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl">
              <span className="relative z-10 flex items-center justify-center">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
            <button className="group text-foreground min-w-[220px] transform rounded-xl border-2 border-white/30 bg-transparent px-10 py-4 font-semibold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/10">
              <span className="flex items-center justify-center">
                Schedule a Demo
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
