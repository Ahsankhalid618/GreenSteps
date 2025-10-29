"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="fixed top-0 z-50 w-full ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Leaf className="h-8 w-8 text-green-400" />
            <span className="text-2xl font-bold text-white">GreenSteps</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <Link href="/sign-in">
              <button className="rounded-lg px-4 py-2 text-white transition-colors duration-300 hover:text-green-300">
                Sign In
              </button>
            </Link>
            <Link href="/sign-up">
              <button className="rounded-full bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-2 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                Get Started
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </nav>
  );
}
