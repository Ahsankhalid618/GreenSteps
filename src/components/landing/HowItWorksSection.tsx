"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Target, CheckCircle, Award } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      step: "01",
      title: "Sign Up & Set Goals",
      description:
        "Create your account and set personalized environmental goals based on your lifestyle.",
      icon: Target,
    },
    {
      step: "02",
      title: "Track Daily Actions",
      description:
        "Log eco-friendly activities like recycling, using public transport, or conserving energy.",
      icon: CheckCircle,
    },
    {
      step: "03",
      title: "Earn Rewards & Impact",
      description:
        "Collect points, unlock badges, and see your real environmental impact grow over time.",
      icon: Award,
    },
  ];

  return (
    <section className="relative py-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/work.jpg"
          alt="How it works background"
          layout="fill"
          objectFit="cover"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="from-background/30 via-background/60 to-background/30 absolute inset-0 bg-gradient-to-b" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-4xl font-bold text-white md:text-6xl">
            How It Works
          </h2>
          <p className="mx-auto max-w-4xl text-xl text-green-100">
            Getting started with your eco-friendly journey is simple and
            rewarding. Follow these easy steps to make a difference.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center border-2 border-green-500/50 bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-lg"
            >
              <div className="relative mb-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg">
                  <step.icon className="h-10 w-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-bold text-green-500">
                  {step.step}
                </div>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">
                {step.title}
              </h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
