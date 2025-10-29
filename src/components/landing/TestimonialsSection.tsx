"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Environmental Enthusiast",
    image: "/images/green.jpg",
    rating: 5,
    text: "GreenSteps has completely transformed how I think about sustainability. The gamification aspect makes it so easy and fun to track my eco-friendly actions!",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Corporate Sustainability Manager",
    image: "/images/green.jpg",
    rating: 5,
    text: "Our company adopted GreenSteps and saw a 40% increase in employee engagement with sustainability initiatives. It's a game-changer!",
  },
  {
    id: 3,
    name: "Emily Johnson",
    role: "Climate Advocate",
    image: "/images/green.jpg",
    rating: 5,
    text: "The community aspect is incredible. I've learned so many new ways to reduce my carbon footprint from other users. Highly recommend!",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative mx-auto max-w-7xl py-20 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="bg-primary/10 text-primary mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Quote className="h-4 w-4" />
            <span>What Our Users Say</span>
          </div>
          <h2 className="mb-6 text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
            Trusted by <span className="text-primary">Eco-Warriors</span>{" "}
            Worldwide
          </h2>
          <p className="text-muted-foreground mx-auto max-w-4xl text-lg leading-relaxed text-pretty sm:text-xl">
            Join thousands of individuals and organizations making a real
            difference for our planet with GreenSteps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-xl transition-all duration-300 hover:shadow-xl"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <Quote className="text-green-500 h-8 w-8" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="mb-6 leading-relaxed text-gray-300">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="ring-primary/20 h-12 w-12 rounded-full object-cover ring-2"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-200">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-primary mb-1 text-3xl font-bold">50K+</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-1 text-3xl font-bold">1M+</div>
              <div className="text-muted-foreground text-sm">
                Actions Tracked
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-1 text-3xl font-bold">500K</div>
              <div className="text-muted-foreground text-sm">
                CO₂ Reduced (tons)
              </div>
            </div>
            <div className="text-center">
              <div className="text-primary mb-1 text-3xl font-bold">98%</div>
              <div className="text-muted-foreground text-sm">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
