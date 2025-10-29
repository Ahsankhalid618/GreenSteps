"use client";

import React from "react";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-black/20 py-16 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 flex items-center justify-center space-x-2">
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">GreenSteps</span>
          </div>
          <p className="mb-6 text-green-100">
            Making the world greener, one step at a time.
          </p>
          <div className="flex justify-center space-x-8 text-green-300">
            <button className="transition-colors duration-300 hover:text-white">
              Privacy
            </button>
            <button className="transition-colors duration-300 hover:text-white">
              Terms
            </button>
            <button className="transition-colors duration-300 hover:text-white">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
