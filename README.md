# 🌱 GreenSteps - Environmental Impact Tracker

> **Empowering individuals and organizations to track, measure, and reduce their environmental footprint through data-driven insights and actionable recommendations.**

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Appwrite](https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)

</div>

---

## 🎯 Vision

GreenSteps transforms the complex world of environmental responsibility into actionable insights. We believe that **measuring environmental impact shouldn't be complicated**—it should be intuitive, engaging, and motivating.

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

### **Styling System**
```css
/* Glassmorphism Design Language */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Emerald Green Color Palette */
Primary: #10b981 (Emerald-500)
Secondary: #065f46 (Emerald-800)
Accent: #d1fae5 (Emerald-100)
```

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 18.0.0
npm or yarn package manager
Git for version control
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/greensteps.git
   cd greensteps
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   # Appwrite Configuration
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_api_key
   
   # Database
   NEXT_PUBLIC_DATABASE_ID=your_database_id
   NEXT_PUBLIC_USER_COLLECTION_ID=your_collection_id
   ```

4. **Database Setup**
   
   **Important**: Before running the application, you need to set up your Appwrite database and collections. See the [Database Setup Guide](./DATABASE_SETUP_GUIDE.md) for detailed instructions.

5. **Launch Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   ```
   http://localhost:3000
   ```

---

## 📱 User Experience

### **Landing Page Journey**
1. **Hero Section** - Compelling introduction with glassmorphism effects
2. **Features Overview** - Core platform capabilities with background imagery
3. **How It Works** - Step-by-step process explanation
4. **Benefits Showcase** - Value propositions with visual elements
5. **Testimonials** - User success stories and feedback
6. **Call-to-Action** - Seamless conversion to sign-up

### **Authentication Flow**
- **Modern Design** - Glass-effect forms with gradient inputs
- **Validation** - Real-time form validation with helpful error messages
- **Security** - Secure authentication powered by Appwrite
- **User Experience** - Smooth transitions and responsive design

### **Dashboard Experience**
- **Personalized Metrics** - Individual environmental impact tracking
- **Visual Analytics** - Charts, graphs, and progress indicators
- **Actionable Insights** - Recommendations based on user data
- **Goal Management** - Set, track, and achieve environmental targets

---

## 🎨 Design Philosophy

### **Glassmorphism Aesthetic**
- **Translucent Elements** - Semi-transparent components with blur effects
- **Depth & Layering** - Strategic use of shadows and overlays
- **Modern Appeal** - Clean, contemporary visual language
- **Accessibility** - Maintains readability and usability standards

### **Color Psychology**
- **Emerald Green** - Represents growth, nature, and sustainability
- **Neutral Grays** - Provides balance and sophistication
- **Strategic Accents** - Highlights important actions and information

### **Animation Strategy**
- **Framer Motion** - Smooth, purposeful animations
- **Performance Optimized** - 60fps animations without sacrificing speed
- **User Guidance** - Animations that direct attention and explain functionality

---

## 🌟 Development Highlights

### **Modular Architecture**
```typescript
// Component-based development for scalability
export { Navigation } from './Navigation'
export { HeroSection } from './HeroSection'
export { FeaturesSection } from './FeaturesSection'
// ... all landing components
```

### **Type Safety**
```typescript
// Comprehensive TypeScript integration
interface UserProfile {
  id: string
  email: string
  name: string
  environmental_goals: EnvironmentalGoal[]
  carbon_footprint: CarbonFootprint
}
```

### **Performance Optimization**
- **Next.js Image Optimization** - Automatic image compression and lazy loading
- **Component Lazy Loading** - On-demand component rendering
- **Efficient Bundle Splitting** - Optimized JavaScript delivery

---

## 🧪 Testing Strategy

### **Component Testing**
```bash
npm run test              # Run all tests
npm run test:watch        # Watch mode for development
npm run test:coverage     # Generate coverage reports
```

### **E2E Testing**
```bash
npm run test:e2e          # End-to-end testing
npm run test:integration  # Integration tests
```

---

## � Deployment

### **Production Build**
```bash
npm run build             # Create optimized production build
npm run start             # Start production server
```

### **Deployment Platforms**
- **Vercel** (Recommended) - Seamless Next.js deployment
- **Netlify** - Alternative hosting platform
- **AWS/Azure/GCP** - Enterprise cloud solutions

---

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### **Development Workflow**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Appwrite Team** - For providing excellent backend-as-a-service
- **Vercel Team** - For the incredible Next.js framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animation capabilities
- **Environmental Community** - For inspiration and guidance

---

## 📞 Support & Contact

- **Documentation**: [docs.greensteps.com](https://docs.greensteps.com)
- **Issues**: [GitHub Issues](https://github.com/yourusername/greensteps/issues)
- **Email**: support@greensteps.com
- **Community**: [Discord Server](https://discord.gg/greensteps)

---

<div align="center">

**Made with 💚 for a sustainable future**

*Every step counts towards a greener tomorrow*

</div>
- [x] Next.js 15 with App Router setup
- [x] Tailwind CSS v4 with custom green theme
- [x] TypeScript type definitions
- [x] Appwrite backend configuration
- [x] Authentication system (sign-in/sign-up)
- [x] UI component library
- [x] Landing page with animations
- [x] Dashboard with points display
- [x] Responsive design

### 🚧 In Progress
- [ ] Action logging system
- [ ] Badge and achievement system
- [ ] Challenge system
- [ ] Impact visualization charts
- [ ] Leaderboard functionality

## 📊 Database Schema

### Users Collection
- User profile information
- Points, level, and streak data
- Badges and achievements
- Preferences and settings

### Actions Collection
- Eco-action logs with timestamps
- Category, points, and impact metrics
- Verification status and metadata

### Challenges Collection
- Community and personal challenges
- Requirements and rewards
- Participant tracking

### Badges Collection
- Badge definitions and requirements
- Categories and rarity levels
- Unlock conditions

## 🎯 Action Categories

1. **Transportation** 🚗 - Eco-friendly travel choices
2. **Energy** ⚡ - Energy conservation and renewable sources
3. **Waste** ♻️ - Waste reduction and recycling
4. **Water** 💧 - Water conservation
5. **Food** 🌱 - Sustainable food choices
6. **Shopping** 🛍️ - Conscious consumption
7. **Lifestyle** 🏠 - Sustainable living practices
8. **Community** 🤝 - Community environmental actions

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

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Appwrite](https://appwrite.io) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com) for the styling framework
- [Framer Motion](https://framer.com/motion) for animations
- [Lucide](https://lucide.dev) for the icon library

---

**Made with 🌱 for a greener planet**