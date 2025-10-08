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
      bgColor: "bg-green-100",
    },
    {
      icon: Zap,
      title: "Earn Points & Badges",
      description:
        "Gamify your green journey with points, levels, and achievement badges",
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      icon: Users,
      title: "Join Challenges",
      description:
        "Participate in community challenges and compete with friends",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: TrendingUp,
      title: "Visualize Impact",
      description:
        "See your carbon footprint reduction and environmental contributions",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
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
      <div className="dark:from-dark-bg dark:to-dark-surface flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <Card className="mx-4 w-full max-w-md">
          <CardContent className="text-center">
            <Leaf className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h1 className="text-earth-900 dark:text-dark-text-primary mb-2 text-2xl font-bold">
              Welcome back, {user.name}!
            </h1>
            <p className="text-earth-600 dark:text-dark-text-secondary mb-6">
              Ready to continue your eco-journey?
            </p>
            <Link href="/dashboard">
              <Button fullWidth>Go to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="dark:from-dark-bg dark:to-dark-surface min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="success" className="mb-6">
                🌱 Making the world greener, one step at a time
              </Badge>
              <h1 className="text-earth-900 dark:text-dark-text-primary mb-6 text-6xl font-bold md:text-7xl">
                Track Your
                <span className="text-gradient block">Eco Journey</span>
              </h1>
              <p className="text-earth-600 dark:text-dark-text-secondary mx-auto mb-8 max-w-2xl text-xl">
                Gamify your environmental impact with GreenSteps. Track
                sustainable actions, earn points, unlock badges, and make a real
                difference for our planet.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/sign-up">
                  <Button size="lg">
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="secondary" size="lg">
                    Sign In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="floating absolute top-20 left-10">
          <Leaf className="h-8 w-8 text-green-400 opacity-60" />
        </div>
        <div
          className="floating absolute top-40 right-20"
          style={{ animationDelay: "1s" }}
        >
          <Globe className="h-6 w-6 text-blue-400 opacity-60" />
        </div>
        <div
          className="floating absolute bottom-20 left-20"
          style={{ animationDelay: "2s" }}
        >
          <Heart className="h-7 w-7 text-red-400 opacity-60" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="dark:bg-dark-surface/50 bg-white/50 py-16">
        <div className="container mx-auto px-4">
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
                <div className="mb-4 inline-flex rounded-full bg-green-100 p-3">
                  <stat.icon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-earth-900 dark:text-dark-text-primary mb-1 text-3xl font-bold">
                  {stat.value}
                </h3>
                <p className="text-earth-600 dark:text-dark-text-secondary">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2 className="text-earth-900 dark:text-dark-text-primary mb-4 text-4xl font-bold">
              Everything You Need to Go Green
            </h2>
            <p className="text-earth-600 dark:text-dark-text-secondary mx-auto max-w-2xl text-xl">
              Our platform makes it easy and fun to track your environmental
              impact and build sustainable habits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card hover className="h-full">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex rounded-full p-4 ${feature.bgColor} mb-4`}
                    >
                      <feature.icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-earth-900 dark:text-dark-text-primary mb-2 text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-earth-600 dark:text-dark-text-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="dark:bg-dark-surface/50 bg-white/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-earth-900 dark:text-dark-text-primary mb-6 text-4xl font-bold">
                Why Choose GreenSteps?
              </h2>
              <p className="text-earth-600 dark:text-dark-text-secondary mb-8 text-xl">
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
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="text-earth-700 dark:text-dark-text-secondary">
                      {benefit}
                    </span>
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
              <Card className="p-8">
                <div className="text-center">
                  <div className="mb-6 inline-flex rounded-full bg-gradient-to-r from-green-400 to-green-500 p-4">
                    <Leaf className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-earth-900 dark:text-dark-text-primary mb-4 text-2xl font-bold">
                    Ready to Start?
                  </h3>
                  <p className="text-earth-600 dark:text-dark-text-secondary mb-6">
                    Join our community and start making a positive impact today.
                  </p>
                  <Link href="/sign-up">
                    <Button size="lg" fullWidth>
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-earth-900 dark:text-dark-text-primary mb-6 text-4xl font-bold">
              Make Every Step Count
            </h2>
            <p className="text-earth-600 dark:text-dark-text-secondary mb-8 text-xl">
              Start your eco-journey today and join thousands of users making a
              difference for our planet. It&apos;s free, fun, and impactful.
            </p>
            <Link href="/sign-up">
              <Button size="xl">
                Start Your Green Journey
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
