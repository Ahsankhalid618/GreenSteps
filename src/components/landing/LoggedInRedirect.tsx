"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf } from "lucide-react";

interface LoggedInRedirectProps {
  userName: string;
}

export default function LoggedInRedirect({ userName }: LoggedInRedirectProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600">
      <div className="mx-4 w-full max-w-md rounded-3xl border border-white/20 bg-white/20 p-8 text-center shadow-2xl backdrop-blur-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <Leaf className="mx-auto mb-6 h-20 w-20 animate-pulse text-green-100" />
        </motion.div>
        <h1 className="mb-4 text-3xl font-bold text-white">
          Welcome back, {userName}!
        </h1>
        <p className="mb-8 text-lg text-green-100">
          Ready to continue your eco-journey?
        </p>
        <Link href="/dashboard">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-2xl bg-white px-8 py-4 font-bold text-green-600 shadow-lg transition-all duration-300 hover:shadow-xl"
          >
            Go to Dashboard
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
