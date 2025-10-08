# Appwrite Setup Guide

## The Error: "User (role: guests) missing scopes (["account"])"

This error occurs when Appwrite is not properly configured. Here's how to fix it:

## Step 1: Create Appwrite Project

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Sign in or create an account
3. Create a new project
4. Note down your **Project ID**

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-actual-project-id-here
```

Replace `your-actual-project-id-here` with your actual project ID from Step 1.

## Step 3: Configure Appwrite Project Settings

### 3.1 Authentication Settings

1. In your Appwrite console, go to **Authentication**
2. Go to **Settings** tab
3. Enable the following:
   - ✅ **Email/Password** authentication
   - ✅ **Allow new users to register**
   - ✅ **Allow users to login with email and password**

### 3.2 Platform Settings

1. Go to **Platforms** in your Appwrite console
2. Add a new **Web** platform
3. Set the hostname to:
   - For development: `localhost`
   - For production: your domain (e.g., `yourdomain.com`)

### 3.3 Database Setup (Optional)

If you want to store additional user data:

1. Go to **Databases** in your Appwrite console
2. Create a new database called `greensteps`
3. Create collections as needed (users, actions, etc.)

## Step 4: Verify Configuration

After setting up, restart your development server:

```bash
npm run dev
```

## Common Issues and Solutions

### Issue 1: "Project ID not found"
- **Solution**: Double-check your project ID in `.env.local`
- **Solution**: Make sure the project exists in your Appwrite console

### Issue 2: "Invalid endpoint"
- **Solution**: Use the correct endpoint: `https://cloud.appwrite.io/v1`
- **Solution**: For self-hosted Appwrite, use your custom endpoint

### Issue 3: "Platform not configured"
- **Solution**: Add your domain to the platforms list in Appwrite console
- **Solution**: For development, add `localhost` as a platform

### Issue 4: "Authentication disabled"
- **Solution**: Enable email/password authentication in Appwrite console
- **Solution**: Check that user registration is enabled

## Testing the Setup

1. Start your development server: `npm run dev`
2. Navigate to `/sign-up`
3. Try creating a new account
4. If successful, try logging in at `/sign-in`

## Production Deployment

When deploying to production:

1. Update your platform settings in Appwrite console
2. Add your production domain to the platforms list
3. Update environment variables in your hosting platform
4. Ensure HTTPS is enabled (required for production)

## Need Help?

- [Appwrite Documentation](https://appwrite.io/docs)
- [Appwrite Discord Community](https://discord.gg/appwrite)
- [Appwrite GitHub](https://github.com/appwrite/appwrite)
