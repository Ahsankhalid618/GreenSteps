# 🌱 GreenSteps - Eco-Friendly Action Tracking Platform

GreenSteps is a gamified eco-action tracking platform that encourages sustainable behaviors through points, badges, challenges, and impact visualization.

## ✨ Features

- **Action Tracking**: Log eco-friendly actions with categories and impact metrics
- **Gamification**: Earn points, unlock badges, and level up your eco-journey
- **Challenges**: Participate in community and personal challenges
- **Impact Visualization**: See your environmental impact through charts and metrics
- **Leaderboard**: Compete with friends and the community
- **Streaks**: Maintain daily action streaks for bonus rewards

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router) + React 19
- **Styling**: Tailwind CSS v4 with custom green theme
- **Animations**: Framer Motion for smooth micro-interactions
- **Backend**: Appwrite (Database, Authentication, Storage, Functions)
- **State Management**: React Context + Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for impact visualization
- **Icons**: Lucide React

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
```

### 3. Set Up Appwrite Database

**Important**: Before running the application, you need to set up your Appwrite database and collections. See the [Database Setup Guide](./DATABASE_SETUP_GUIDE.md) for detailed instructions.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
GreenSteps/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Main dashboard
│   │   ├── sign-in/           # Authentication pages
│   │   ├── sign-up/
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/               # Base UI components
│   │   ├── gamification/     # Gamification elements
│   │   └── providers/        # Context providers
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts          # Authentication service
│   │   ├── database.ts      # Database operations
│   │   ├── utils.ts         # General utilities
│   │   └── constants.ts     # App constants
│   ├── hooks/               # Custom React hooks
│   ├── types/               # TypeScript definitions
│   └── tools/               # Appwrite configuration
├── appwrite.json            # Appwrite collections config
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
```

### 3. Appwrite Setup

1. Create a new project in [Appwrite Console](https://cloud.appwrite.io)
2. Copy your project ID to the environment file
3. Import the collections from `appwrite.json`:
   - Go to your Appwrite project
   - Navigate to Databases
   - Create a new database named "greensteps"
   - Import the collections: users, actions, challenges, badges

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🎨 Design System

### Color Palette
- **Primary Green**: `#22c55e` - Main brand color
- **Secondary Green**: `#16a34a` - Darker green for accents
- **Earth Tones**: Neutral browns and grays for text and backgrounds
- **Status Colors**: Success, warning, error, and info variants

### Typography
- **Display Font**: Poppins (headings)
- **Body Font**: Inter (body text)

### Components
- **Cards**: Glass-morphism effect with subtle shadows
- **Buttons**: Gradient backgrounds with hover animations
- **Badges**: Rounded with category-based colors
- **Progress Bars**: Animated with gradient fills

## 🔧 Key Features Implemented

### ✅ Completed
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