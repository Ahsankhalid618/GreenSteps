# Landing Page Components

This directory contains modular components for the GreenSteps landing page.

## Components Structure

```
src/components/landing/
├── index.ts                 # Export all components
├── Navigation.tsx           # Top navigation bar
├── HeroSection.tsx          # Main hero section with CTA
├── FeaturesSection.tsx      # Features grid display
├── HowItWorksSection.tsx    # 3-step process explanation
├── BenefitsSection.tsx      # Benefits with glassmorphism card
├── CTASection.tsx           # Call-to-action section
├── Footer.tsx               # Site footer
└── LoggedInRedirect.tsx     # Logged-in user redirect component
```

## Usage

Import and use the components in your page:

```tsx
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  BenefitsSection,
  CTASection,
  Footer,
  LoggedInRedirect,
} from "@/components/landing";
```

## Benefits of This Structure

1. **Modularity**: Each section is a separate component
2. **Reusability**: Components can be used in other pages
3. **Maintainability**: Easy to update individual sections
4. **Testing**: Each component can be tested independently
5. **Performance**: Components can be optimized individually
6. **Code Organization**: Clear separation of concerns

## Features

- **Glassmorphism Design**: Modern glass-like effects
- **Framer Motion Animations**: Smooth, engaging animations
- **Responsive Design**: Works on all screen sizes
- **Eco-Friendly Theme**: Green color palette and nature icons
- **TypeScript Support**: Full type safety