# Database Setup Guide

The "Database not found" error occurs because the Appwrite database and collections haven't been created yet. Follow these steps to set up your database:

## Option 1: Manual Setup (Recommended)

### 1. Go to Appwrite Console
- Open your Appwrite console at your endpoint URL
- Navigate to your project

### 2. Create Database
- Go to **Databases** section
- Click **Create Database**
- Set Database ID: Use the ID from your `NEXT_PUBLIC_APPWRITE_DATABASE_ID` environment variable
- Set Name: `GreenSteps`
- Set Description: `Database for GreenSteps eco-tracking application`

### 3. Create Collections

#### Actions Collection
- Collection ID: `actions`
- Name: `Actions`
- Description: `User eco-actions and their impact`

**Attributes:**
- `category` (String, 50 chars, Required)
- `description` (String, 1000 chars, Required)
- `difficulty` (Enum: easy, medium, hard, Required)
- `points` (Integer, Required)
- `userId` (String, 255 chars, Required)
- `timestamp` (DateTime, Required)
- `carbonSaved` (Double, Required)
- `waterSaved` (Double, Required)
- `wasteReduced` (Double, Required)

**Permissions:**
- Read: Any
- Create: Users
- Update: Users
- Delete: Users

#### Users Collection
- Collection ID: `users`
- Name: `Users`
- Description: `User profiles and statistics`

**Attributes:**
- `userId` (String, 255 chars, Required)
- `name` (String, 255 chars, Required)
- `email` (String, 255 chars, Required)
- `totalPoints` (Integer, Required, Default: 0)
- `level` (Integer, Required, Default: 1)
- `currentStreak` (Integer, Required, Default: 0)
- `totalActions` (Integer, Required, Default: 0)
- `carbonSaved` (Double, Required, Default: 0)
- `waterSaved` (Double, Required, Default: 0)
- `wasteReduced` (Double, Required, Default: 0)
- `badges` (String, 1000 chars, Optional)
- `preferences` (String, 1000 chars, Optional)
- `createdAt` (DateTime, Required)
- `updatedAt` (DateTime, Required)

**Permissions:**
- Read: Any
- Create: Users
- Update: Users
- Delete: Users

#### Challenges Collection
- Collection ID: `challenges`
- Name: `Challenges`
- Description: `Eco-challenges and competitions`

**Attributes:**
- `title` (String, 255 chars, Required)
- `description` (String, 1000 chars, Required)
- `category` (String, 50 chars, Required)
- `difficulty` (Enum: easy, medium, hard, Required)
- `points` (Integer, Required)
- `startDate` (DateTime, Required)
- `endDate` (DateTime, Required)
- `maxParticipants` (Integer, Optional)
- `currentParticipants` (Integer, Required, Default: 0)
- `isActive` (Boolean, Required, Default: true)
- `requirements` (String, 1000 chars, Optional)

**Permissions:**
- Read: Any
- Create: Any
- Update: Any
- Delete: Any

#### Badges Collection
- Collection ID: `badges`
- Name: `Badges`
- Description: `Achievement badge definitions`

**Attributes:**
- `name` (String, 255 chars, Required)
- `description` (String, 1000 chars, Required)
- `icon` (String, 255 chars, Required)
- `category` (String, 50 chars, Required)
- `rarity` (Enum: common, rare, epic, legendary, Required)
- `points` (Integer, Required)
- `conditions` (String, 2000 chars, Required)
- `isActive` (Boolean, Required, Default: true)
- `createdAt` (DateTime, Required)
- `updatedAt` (DateTime, Required)

**Permissions:**
- Read: Any
- Create: Any
- Update: Any
- Delete: Any

#### Achievements Collection
- Collection ID: `achievements`
- Name: `Achievements`
- Description: `User earned badges and achievements`

**Attributes:**
- `userId` (String, 255 chars, Required)
- `badgeId` (String, 255 chars, Required)
- `earnedAt` (DateTime, Required)
- `points` (Integer, Required)
- `description` (String, 1000 chars, Optional)

**Permissions:**
- Read: Any
- Create: Users
- Update: Users
- Delete: Users

#### Leaderboard Collection
- Collection ID: `leaderboard`
- Name: `Leaderboard`
- Description: `User rankings and statistics`

**Attributes:**
- `userId` (String, 255 chars, Required)
- `name` (String, 255 chars, Required)
- `totalPoints` (Integer, Required)
- `level` (Integer, Required)
- `rank` (Integer, Required)
- `totalActions` (Integer, Required)
- `carbonSaved` (Double, Required)
- `waterSaved` (Double, Required)
- `wasteReduced` (Double, Required)
- `lastUpdated` (DateTime, Required)

**Permissions:**
- Read: Any
- Create: Users
- Update: Users
- Delete: Users

## Option 2: Quick Setup Script

If you prefer to use the setup page:

1. Navigate to `/setup` in your application
2. Click "Setup Database" button
3. Wait for the setup to complete

## Verification

After setting up the database:

1. Go to your Appwrite console
2. Navigate to Databases → greensteps
3. Verify all 6 collections are created
4. Check that permissions are set correctly
5. Test the actions page at `/dashboard/actions`

## Troubleshooting

### Common Issues:

1. **Permission Errors**: Make sure collections have the correct permissions
2. **Attribute Errors**: Ensure all required attributes are created
3. **Database ID Mismatch**: Verify the database ID matches your `NEXT_PUBLIC_APPWRITE_DATABASE_ID` environment variable
4. **Collection ID Mismatch**: Verify collection IDs match the configuration

### Environment Variables:

Make sure your `.env.local` file contains:
```
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_DATABASE_ID=your_database_id
```

## Next Steps

Once the database is set up:
1. Test logging an action
2. Verify data is being saved
3. Check the dashboard displays correctly
4. Set up additional features as needed
