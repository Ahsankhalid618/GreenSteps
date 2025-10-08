# Quick Setup Guide

## Fix the 401 Unauthorized Error

The error you're seeing is normal when no user is logged in. Here's how to set up your environment:

### 1. Create Environment File

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
```

### 2. Get Your Appwrite Project ID

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Create a new project or select existing one
3. Copy the **Project ID** from the project settings
4. Replace `your-project-id-here` in `.env.local`

### 3. Configure Appwrite Project

In your Appwrite console:

1. **Authentication Settings**:
   - Go to **Authentication** → **Settings**
   - Enable **Email/Password** authentication
   - Enable **Allow new users to register**

2. **Platform Settings**:
   - Go to **Platforms**
   - Add **Web** platform
   - Set hostname to `localhost` for development

### 4. Restart Development Server

```bash
npm run dev
```

## What the 401 Error Means

- **Normal behavior**: The 401 error occurs when `getCurrentUser()` is called but no user is logged in
- **Fixed**: The app now handles this gracefully and shows a loading state
- **Expected**: You'll see this error in console when no user is authenticated (this is normal)

## Testing Authentication

1. Navigate to `/sign-up` to create a new account
2. Navigate to `/sign-in` to login with existing account
3. After successful login, you'll be redirected to `/dashboard`

The 401 error should no longer appear in the console after these fixes.
