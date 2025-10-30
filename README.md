<div align="center">
<!-- Home Page Image -->
<img src="https://raw.githubusercontent.com/Ahsankhalid618/GreenSteps/refs/heads/main/public/Homepage.png" alt="GreenSteps Home Page" width="800" />
<br/><br/>

<!-- Dashboard Images Grid 2x2 -->
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; max-width: 800px; margin: 0 auto;">
  <div style="width: 350px; height: 200px; overflow: hidden;">
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/GreenSteps/refs/heads/main/public/Dashboard.png" alt="GreenSteps Dashboard" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="width: 350px; height: 200px; overflow: hidden;">
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/GreenSteps/refs/heads/main/public/Actions.png" alt="GreenSteps Actions" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="width: 350px; height: 200px; overflow: hidden;">
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/GreenSteps/refs/heads/main/public/Challenge.png" alt="GreenSteps Challenge" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
  <div style="width: 350px; height: 200px; overflow: hidden;">
    <img src="https://raw.githubusercontent.com/Ahsankhalid618/GreenSteps/refs/heads/main/public/badge.png" alt="GreenSteps Badge" style="width: 100%; height: 100%; object-fit: cover;" />
  </div>
</div>

</div>

---

# 🌱 GreenSteps

## Features & Main Concept

GreenSteps is an environmental impact tracker designed to help individuals and organizations measure, understand, and reduce their carbon footprint. With interactive dashboards, personalized recommendations, and gamified progress tracking, users are empowered to make sustainable choices and visualize their positive impact on the environment.

- Track daily, weekly, and monthly carbon emissions
- Log activities (transport, energy, consumption)
- Visualize progress with charts and analytics
- Set and achieve personalized sustainability goals
- Get AI-powered eco-friendly suggestions
- Join community challenges and leaderboards

## Why Is This Project Useful?

GreenSteps makes sustainability accessible and engaging. It transforms complex environmental data into actionable insights, motivates users to improve their habits, and fosters community-driven change for a healthier planet.

## Tech Stack
<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

</div>

---

## ✨ Key Features

### 🔐 **Smart Authentication System**
- **Glassmorphism UI Design** - Modern, translucent interface elements
- **Secure User Profiles** - Powered by Appwrite backend
- **Dynamic Profile Management** - Real-time user data synchronization

### 📊 **Environmental Tracking Dashboard**
- **Carbon Footprint Calculator** - Track daily, weekly, and monthly emissions
- **Activity Logging** - Transportation, energy, consumption habits
- **Progress Visualization** - Interactive charts and trend analysis
- **Goal Setting & Achievements** - Personalized environmental targets

### 💡 **Intelligent Recommendations**
- **AI-Powered Suggestions** - Personalized eco-friendly alternatives
- **Impact Comparisons** - See how changes affect your footprint
- **Community Challenges** - Group initiatives and competitions
- **Reward Systems** - Gamified environmental responsibility

### 🌍 **Community Features**
- **Environmental News Hub** - Latest sustainability updates
- **Local Initiatives** - Community-driven environmental projects
- **Impact Leaderboards** - Friendly competition for positive change
- **Educational Resources** - Curated environmental content

## 🎯 Action Categories

- 1. **Transportation** 🚗 - Eco-friendly travel choices
- 2. **Energy** ⚡ - Energy conservation and renewable sources
- 3. **Waste** ♻️ - Waste reduction and recycling
- 4. **Water** 💧 - Water conservation
- 5. **Food** 🌱 - Sustainable food choices
- 6. **Shopping** 🛍️ - Conscious consumption
- 7. **Lifestyle** 🏠 - Sustainable living practices
- 8. **Community** 🤝 - Community environmental actions

## 🏆 Gamification System

### Points System
- Base points for each action
- Difficulty multipliers (easy: 1x, medium: 1.5x, hard: 2x)
- Streak bonuses (10% per day)
- First-time action bonus (2x points)

### Level System
- Levels based on total points
- Each level requires 1000 * level points
- Level names: Seedling → Sprout → Sapling → Tree → Forest → Ecosystem → Planet

### Badges
- **Action Badges**: For completing specific actions
- **Streak Badges**: For maintaining daily streaks
- **Challenge Badges**: For completing challenges
- **Milestone Badges**: For reaching point milestones
- **Special Badges**: For unique achievements


---

## 🏗️ Technical Architecture

### **Frontend Stack**
```typescript
// Core Technologies
- Next.js 14        // React framework with SSR/SSG
- TypeScript        // Type-safe development
- Tailwind CSS     // Utility-first styling
- Framer Motion    // Advanced animations
```

### **Component Architecture**
```
src/components/
├── landing/           # Modular landing page components
│   ├── Navigation     # Responsive navigation with glassmorphism
│   ├── HeroSection    # Animated hero with CTA
│   ├── FeaturesSection # Core platform features
│   ├── HowItWorksSection # Process explanation
│   ├── BenefitsSection # Value propositions
│   ├── TestimonialsSection # User testimonials
│   ├── CTASection     # Call-to-action
│   └── Footer         # Links and information
├── auth/              # Authentication components
├── dashboard/         # User dashboard components
└── shared/            # Reusable UI components
```

### **Backend & Database**
```yaml
Database: Appwrite
- User Management: Authentication & profiles
- Data Storage: Environmental tracking data
- Real-time Sync: Live dashboard updates
- Security: Encrypted data transmission
```


## Getting Started Locally

1. **Clone the repo:**
   ```sh
   git clone https://github.com/Ahsankhalid618/GreenSteps.git
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env.local` and update values.

4. **Start the development server:**
   ```sh
   npm run dev
   ```

---

