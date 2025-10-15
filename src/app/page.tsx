"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  Leaf,
  TrendingUp,
  Users,
  Award,
  Zap,
  Target,
  ArrowRight,
  CheckCircle,
  Globe,
  Heart,
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuthContext();

  const features = [
    {
      icon: Leaf,
      title: "Track Eco Actions",
      description:
        "Log your sustainable activities and see your environmental impact grow",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/40",
    },
    {
      icon: Zap,
      title: "Earn Points & Badges",
      description:
        "Gamify your green journey with points, levels, and achievement badges",
      color: "text-amber-500",
      bgColor: "bg-amber-100 dark:bg-amber-900/40",
    },
    {
      icon: Users,
      title: "Join Challenges",
      description:
        "Participate in community challenges and compete with friends",
      color: "text-sky-500",
      bgColor: "bg-sky-100 dark:bg-sky-900/40",
    },
    {
      icon: TrendingUp,
      title: "Visualize Impact",
      description:
        "See your carbon footprint reduction and environmental contributions",
      color: "text-forest-500",
      bgColor: "bg-forest-100 dark:bg-forest-900/40",
    },
  ];

  const stats = [
    { label: "Actions Tracked", value: "10K+", icon: Target },
    { label: "Carbon Saved", value: "50T+", icon: Leaf },
    { label: "Active Users", value: "5K+", icon: Users },
    { label: "Badges Earned", value: "25K+", icon: Award },
  ];

  const benefits = [
    "Reduce your carbon footprint",
    "Track water and energy savings",
    "Join a community of eco-warriors",
    "Earn rewards for sustainable actions",
    "Visualize your environmental impact",
    "Compete in friendly challenges",
  ];

  if (user) {
    // Redirect to dashboard if user is logged in
    return (
      <div className="gradient-earth flex min-h-screen items-center justify-center">
        <div className="card mx-4 w-full max-w-md p-8 text-center">
          <Leaf className="floating mx-auto mb-6 h-20 w-20 text-green-500" />
          <h1 className="heading-md mb-4">Welcome back, {user.name}!</h1>
          <p className="body-md mb-8">Ready to continue your eco-journey?</p>
          <Link href="/dashboard">
            <button className="btn-primary w-full px-8 py-4">
              Go to Dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-earth min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <div className="container-custom section-padding">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="badge-success mb-6 inline-flex">
                🌱 Making the world greener, one step at a time
              </span>
              <h1 className="heading-xl mb-8">
                Track Your
                <span className="text-gradient-bright mt-2 block">
                  Eco Journey
                </span>
              </h1>
              <p className="body-lg mx-auto mb-10 max-w-2xl">
                Gamify your environmental impact with GreenSteps. Track
                sustainable actions, earn points, unlock badges, and make a real
                difference for our planet.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <button className="btn-primary flex items-center gap-2 px-8 py-4 text-lg">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </Link>
                <Link href="/sign-in">
                  <button className="btn-secondary px-8 py-4 text-lg">
                    Sign In
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating absolute top-20 left-10">
          <Leaf className="h-12 w-12 text-green-400 opacity-50" />
        </div>
        <div
          className="floating absolute top-40 right-20"
          style={{ animationDelay: "1s" }}
        >
          <Globe className="h-10 w-10 text-sky-400 opacity-50" />
        </div>
        <div
          className="floating absolute bottom-20 left-20"
          style={{ animationDelay: "2s" }}
        >
          <Heart className="text-error h-8 w-8 opacity-50" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding dark:bg-dark-surface/60 bg-white/60 backdrop-blur-sm">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="glow-green mb-4 inline-flex rounded-full bg-green-100 p-4 dark:bg-green-900/40">
                  <stat.icon className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="heading-sm text-gradient mb-2">{stat.value}</h3>
                <p className="body-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="heading-lg mb-6">Everything You Need to Go Green</h2>
            <p className="body-lg mx-auto max-w-2xl">
              Our platform makes it easy and fun to track your environmental
              impact and build sustainable habits.
            </p>
          </motion.div>

          <div className="grid-auto-fit">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-hover h-full p-6 text-center">
                  <div
                    className={`inline-flex rounded-full p-4 ${feature.bgColor} mb-4`}
                  >
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <h3 className="heading-xs mb-3">{feature.title}</h3>
                  <p className="body-md">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding dark:bg-dark-surface/60 bg-white/60 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="heading-lg mb-6">Why Choose GreenSteps?</h2>
              <p className="body-lg mb-8">
                Join thousands of users who are making a real difference for our
                planet. Track your progress, earn rewards, and be part of a
                global movement.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
                    <span className="body-md">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-gradient p-8 text-center">
                <div className="floating mb-6 inline-flex rounded-full bg-white/20 p-5 backdrop-blur-sm">
                  <Leaf className="h-16 w-16 text-white" />
                </div>
                <h3 className="heading-sm mb-4 text-white">Ready to Start?</h3>
                <p className="mb-6 text-lg text-white/90">
                  Join our community and start making a positive impact today.
                </p>
                <Link href="/sign-up">
                  <button className="btn w-full bg-white px-8 py-4 text-lg font-semibold text-green-600 hover:bg-green-50">
                    Get Started Free
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="card-eco mx-auto max-w-3xl p-12 text-center"
          >
            <h2 className="heading-lg mb-6">Make Every Step Count</h2>
            <p className="body-lg mb-8">
              Start your eco-journey today and join thousands of users making a
              difference for our planet. It&apos;s free, fun, and impactful.
            </p>
            <Link href="/sign-up">
              <button className="btn-primary inline-flex items-center gap-3 px-10 py-5 text-xl">
                Start Your Green Journey
                <ArrowRight className="h-6 w-6" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
