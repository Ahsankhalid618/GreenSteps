# GreenSteps User Profile & Action Tracking System

## Overview
This system automatically creates and manages user profiles in your Appwrite `users` collection, tracks eco actions, and updates user statistics in real-time.

## Key Features

### 🔧 **Automatic Profile Creation**
- **On Signup**: When a user registers, a profile is automatically created in the `users` collection
- **On Login**: Existing users without profiles get them created automatically
- **Fallback Protection**: Profile creation has error handling to prevent registration/login failures

### 📊 **Dynamic Profile Data**
User profiles store and track:
- `userId` - Links to Appwrite auth user
- `name`, `email` - Basic user info
- `totalPoints` - Accumulated from eco actions
- `level` - Calculated based on points (1000 points = 1 level)
- `currentStreak` - Daily action streak tracking
- `totalActions` - Count of completed eco actions
- `carbonSaved`, `waterSaved`, `wasteReduced` - Environmental impact tracking
- `badges` - Array of earned achievement badges
- `preferences` - User settings (notifications, weekly goals, theme)

### 🎯 **Automatic Action Tracking**
When users complete eco actions:
1. Action is saved to the `actions` collection
2. User profile is automatically updated with:
   - Added points
   - Updated environmental impact stats
   - Incremented action count
   - Level recalculation
   - Streak management
   - Badge checking and awarding

### 🏆 **Badge System**
Automatic badge awarding based on:
- **Action Milestones**: 1, 10, 50, 100+ actions
- **Streak Achievements**: 3, 7, 30+ day streaks
- **Level Progress**: Level 2, 5+ achievements
- **Point Milestones**: 1000, 5000+ points
- **Category Specialists**: Action category expertise

### 🔐 **Password Management**
- **Update Password**: Secure password changes with current password verification
- **Validation**: Enforces password strength requirements
- **Error Handling**: Clear feedback for authentication issues

## Implementation Details

### Files Modified/Created:

#### **Core User Management**
- `src/lib/users.ts` - User profile CRUD operations
- `src/lib/auth.ts` - Authentication with profile creation
- `src/lib/actions.ts` - Action tracking with profile updates

#### **UI Components**
- `src/app/dashboard/profile/page.tsx` - Dynamic profile page
- `src/components/providers/AuthProvider.tsx` - Auto profile creation

#### **Utilities**
- `src/hooks/useEcoActions.ts` - Easy action tracking hook

### Database Schema Required:

#### Users Collection:
```
- userId (string, required)
- name (string, required) 
- email (email, required)
- totalPoints (integer, required, default: 0)
- level (integer, required, default: 1)
- currentStreak (integer, required, default: 0)
- carbonSaved (integer, required, default: 0)
- waterSaved (integer, required, default: 0)
- wasteReduced (integer, required, default: 0)
- badges (string array, nullable)
- preferences (string, nullable)
- totalActions (integer, required, default: 0)
- $createdAt (datetime)
- $updatedAt (datetime)
```

## Usage Examples

### 🎯 **Tracking Eco Actions**
```typescript
import { useEcoActions } from "@/hooks/useEcoActions";

const { saveEcoAction, loading } = useEcoActions();

const handleCompleteAction = async () => {
  await saveEcoAction({
    category: "recycling",
    description: "Recycled plastic bottles",
    difficulty: "easy",
    points: 10,
    impact: {
      carbonSaved: 0.5,
      waterSaved: 2.0,
      wasteReduced: 0.1,
    },
  });
  // User profile automatically updated!
};
```

### 📈 **Manual Profile Updates**
```typescript
import { updateUserProfileFromAction } from "@/lib/users";

// For bulk updates or custom actions
await updateUserProfileFromAction(userId, {
  points: 50,
  carbonSaved: 2.5,
  waterSaved: 10.0,
  category: "energy_saving",
});
```

### 🔐 **Password Updates**
```typescript
import { updatePassword } from "@/lib/auth";

await updatePassword(currentPassword, newPassword);
```

## Benefits

### ✅ **For Users**
- Seamless profile creation
- Real-time progress tracking
- Automatic achievement unlocking
- Secure account management

### ✅ **For Developers**
- Simple action tracking integration
- Automatic data consistency
- Built-in badge system
- Error handling and validation

### ✅ **For the Application**
- Centralized user data management
- Scalable achievement system
- Consistent environmental impact tracking
- Robust authentication flow

## Next Steps

1. **Test the system** with user registration and action completion
2. **Customize badge criteria** in `checkAndAwardBadges()` function
3. **Add notification system** for new achievements
4. **Implement leaderboards** using the existing functions
5. **Add data export** features for user progress reports

The system is now fully integrated and will automatically handle user profile management throughout your GreenSteps application!