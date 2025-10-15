/**
 * GreenSteps Design System Showcase
 *
 * This file demonstrates all the modern UI components
 * available in the GreenSteps design system.
 *
 * All styles are defined in globals.css
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  TrendingUp,
  Award,
  Zap,
  Users,
  Target,
  Heart,
  Sparkles,
  CheckCircle,
} from "lucide-react";

export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen space-y-12 p-8">
      {/* Hero Section */}
      <section className="container-custom section-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h1 className="heading-xl text-gradient">
            Modern Eco-Friendly Dashboard
          </h1>
          <p className="body-lg mx-auto max-w-2xl">
            A comprehensive design system for tracking environmental impact with
            style and purpose.
          </p>
          <div className="flex justify-center gap-4">
            <button className="btn-primary px-8 py-4">Get Started</button>
            <button className="btn-secondary px-8 py-4">Learn More</button>
          </div>
        </motion.div>
      </section>

      {/* Typography Showcase */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Typography</h2>
        <div className="card space-y-4 p-8">
          <h1 className="heading-xl">Heading XL - Hero Title</h1>
          <h2 className="heading-lg">Heading LG - Main Title</h2>
          <h3 className="heading-md">Heading MD - Section Title</h3>
          <h4 className="heading-sm">Heading SM - Subsection</h4>
          <h5 className="heading-xs">Heading XS - Card Title</h5>
          <p className="body-lg">
            Large body text for introductions and important content.
          </p>
          <p className="body-md">
            Medium body text for regular paragraphs and descriptions.
          </p>
          <p className="body-sm">Small body text for captions and metadata.</p>
        </div>
      </section>

      {/* Card Variants */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Card Components</h2>
        <div className="grid-auto-fit">
          <div className="card p-6">
            <h3 className="heading-xs mb-3">Base Card</h3>
            <p className="body-md">
              Standard card with shadow and backdrop blur
            </p>
          </div>

          <div className="card-hover p-6">
            <h3 className="heading-xs mb-3">Hover Card</h3>
            <p className="body-md">Interactive card with lift on hover</p>
          </div>

          <div className="card-glass p-6">
            <h3 className="heading-xs mb-3">Glass Card</h3>
            <p className="body-md">Glassmorphism effect card</p>
          </div>

          <div className="card-gradient p-6">
            <h3 className="heading-xs mb-3 text-white">Gradient Card</h3>
            <p className="text-white/90">Beautiful gradient background</p>
          </div>

          <div className="card-eco p-6">
            <h3 className="heading-xs mb-3">Eco Card</h3>
            <p className="body-md">Earth-toned themed card</p>
          </div>

          <div className="stat-card p-6">
            <div className="mb-4 inline-flex rounded-full bg-green-100 p-4 dark:bg-green-900/40">
              <Leaf className="h-8 w-8 text-green-500" />
            </div>
            <h4 className="text-gradient mb-2 text-4xl font-bold">2.5kg</h4>
            <p className="body-sm">Carbon Saved</p>
          </div>
        </div>
      </section>

      {/* Button Variants */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Button Components</h2>
        <div className="card p-8">
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary px-6 py-3">Primary Button</button>
            <button className="btn-secondary px-6 py-3">
              Secondary Button
            </button>
            <button className="btn-outline px-6 py-3">Outline Button</button>
            <button className="btn-ghost px-6 py-3">Ghost Button</button>
            <button className="btn-success px-6 py-3">Success Button</button>
            <button className="btn-danger px-6 py-3">Danger Button</button>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Badges & Tags</h2>
        <div className="card p-8">
          <div className="flex flex-wrap gap-3">
            <span className="badge-success">
              <CheckCircle className="h-4 w-4" />
              Success
            </span>
            <span className="badge-warning">
              <Zap className="h-4 w-4" />
              Warning
            </span>
            <span className="badge-error">
              <Target className="h-4 w-4" />
              Error
            </span>
            <span className="badge-info">
              <Sparkles className="h-4 w-4" />
              Info
            </span>
            <span className="badge-neutral">
              <Heart className="h-4 w-4" />
              Neutral
            </span>
          </div>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Progress Indicators</h2>
        <div className="card space-y-6 p-8">
          <div>
            <div className="mb-2 flex justify-between">
              <span className="label-text">Daily Goal</span>
              <span className="body-sm">75%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "75%" }} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="label-text">Weekly Challenge</span>
              <span className="body-sm">45%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "45%" }} />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between">
              <span className="label-text">Monthly Target</span>
              <span className="body-sm">90%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "90%" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Form Components */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Form Components</h2>
        <div className="card space-y-4 p-8">
          <div>
            <label className="label-text mb-2 block">Text Input</label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="label-text mb-2 block">Email Input</label>
            <input
              type="email"
              className="input-field"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="label-text mb-2 block">Select Dropdown</label>
            <select className="select-field">
              <option>Choose an option</option>
              <option>Recycling</option>
              <option>Composting</option>
              <option>Energy Saving</option>
            </select>
          </div>

          <div>
            <label className="label-text mb-2 block">Textarea</label>
            <textarea
              className="textarea-field"
              placeholder="Write your eco-action description..."
            />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" className="checkbox-field" id="check1" />
            <label htmlFor="check1" className="label-text cursor-pointer">
              I agree to track my environmental impact
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <input
                type="radio"
                className="radio-field"
                name="category"
                id="radio1"
              />
              <label htmlFor="radio1" className="label-text cursor-pointer">
                Individual Action
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                className="radio-field"
                name="category"
                id="radio2"
              />
              <label htmlFor="radio2" className="label-text cursor-pointer">
                Team Challenge
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Dashboard Stats</h2>
        <div className="grid-auto-fit">
          {[
            {
              icon: Leaf,
              value: "12.5kg",
              label: "Carbon Saved",
              color: "green",
            },
            {
              icon: TrendingUp,
              value: "150L",
              label: "Water Saved",
              color: "blue",
            },
            {
              icon: Award,
              value: "42",
              label: "Badges Earned",
              color: "amber",
            },
            {
              icon: Zap,
              value: "7 days",
              label: "Current Streak",
              color: "orange",
            },
            {
              icon: Users,
              value: "156",
              label: "Community Rank",
              color: "purple",
            },
            {
              icon: Target,
              value: "89%",
              label: "Goal Progress",
              color: "green",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="stat-card"
            >
              <div
                className={`mb-4 inline-flex rounded-full p-4 bg-${stat.color}-100 dark:bg-${stat.color}-900/40`}
              >
                <stat.icon className={`h-8 w-8 text-${stat.color}-500`} />
              </div>
              <h4 className="text-gradient mb-2 text-3xl font-bold">
                {stat.value}
              </h4>
              <p className="body-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Special Effects */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Special Effects</h2>
        <div className="grid-auto-fit">
          <div className="glass-effect rounded-2xl p-8">
            <h3 className="heading-xs mb-3">Glass Effect</h3>
            <p className="body-md">Frosted glass appearance</p>
          </div>

          <div className="card glow-green p-8">
            <h3 className="heading-xs mb-3">Glowing Card</h3>
            <p className="body-md">Subtle green glow effect</p>
          </div>

          <div className="card p-8">
            <h3 className="heading-xs text-gradient mb-3">Gradient Text</h3>
            <p className="body-md">Beautiful gradient on text</p>
          </div>

          <div className="card floating p-8">
            <h3 className="heading-xs mb-3">Floating Animation</h3>
            <p className="body-md">Gentle floating effect</p>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Loading States</h2>
        <div className="card space-y-8 p-8">
          <div className="flex items-center gap-4">
            <div className="spinner" />
            <span className="body-md">Loading spinner</span>
          </div>

          <div className="space-y-3">
            <div className="skeleton h-12 w-3/4" />
            <div className="skeleton h-12 w-1/2" />
            <div className="skeleton h-12 w-5/6" />
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="container-custom">
        <h2 className="heading-lg mb-8">Color Palette</h2>
        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="heading-xs mb-4">Primary Greens</h3>
            <div className="grid grid-cols-5 gap-2">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-2">
                  <div
                    className={`h-16 rounded-lg bg-green-${shade} border-earth-200 border`}
                  />
                  <p className="body-sm text-center">{shade}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="heading-xs mb-4">Earth Tones</h3>
            <div className="grid grid-cols-5 gap-2">
              {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-2">
                  <div
                    className={`h-16 rounded-lg bg-earth-${shade} border-earth-200 border`}
                  />
                  <p className="body-sm text-center">{shade}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
