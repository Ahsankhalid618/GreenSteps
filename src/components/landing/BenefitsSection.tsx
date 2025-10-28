"use client";
import Image from "next/image";

export default function BenefitSection() {
  return (
    <section
      id="impact"
      className="relative mx-auto max-w-7xl overflow-hidden py-20 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div className="animate-fade-in-up space-y-6">
            <div className="bg-primary/10 text-primary inline-block rounded-full px-4 py-2 text-sm font-medium">
              Real Impact
            </div>
            <h2 className="text-4xl leading-tight font-bold text-balance sm:text-5xl lg:text-6xl">
              Making a Difference,{" "}
              <span className="text-primary">One Step at a Time</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Our community has collectively reduced over 500,000 tons of CO₂
              emissions. Every action counts, from choosing sustainable products
              to reducing energy consumption. Together, we&apos;re creating a
              healthier planet for future generations.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="space-y-2">
                <div className="text-primary text-3xl font-bold">500K+</div>
                <p className="text-muted-foreground text-sm">
                  Tons CO₂ Reduced
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-primary text-3xl font-bold">2M+</div>
                <p className="text-muted-foreground text-sm">
                  Plastic Bottles Saved
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-primary text-3xl font-bold">150K+</div>
                <p className="text-muted-foreground text-sm">
                  Sustainable Swaps
                </p>
              </div>
              <div className="space-y-2">
                <div className="text-primary text-3xl font-bold">85%</div>
                <p className="text-muted-foreground text-sm">
                  User Satisfaction
                </p>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="animate-scale-in grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl">
                <Image
                  src="/planting.jpg"
                  alt="Planting trees"
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl">
                <Image
                  src="/solarPanels.jpg"
                  alt="Solar energy"
                  width={500}
                  height={500}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl">
                <Image
                  src="/shopping.jpg"
                  alt="Sustainable shopping"
                  width={500}
                  height={500}
                  className="h-48 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="overflow-hidden rounded-2xl shadow-lg transition-shadow hover:shadow-2xl">
                <Image
                  src="/wind.jpg"
                  alt="Wind energy"
                  width={500}
                  height={500}
                  className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
