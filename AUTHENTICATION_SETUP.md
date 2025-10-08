# Authentication Setup with Appwrite

This project uses Appwrite for authentication with the following setup:

## Environment Variables

Create a `.env.local` file in the root directory with:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id-here
```

Replace `your-project-id-here` with your actual Appwrite project ID from your Appwrite console.

## Authentication Functions

The authentication system is implemented in `src/lib/auth.ts` with the following functions:

- `registerUser(credentials)` - Register a new user
- `loginUser(credentials)` - Login user
- `logoutUser()` - Logout user
- `getCurrentUser()` - Get current authenticated user

## State Management

Authentication state is managed using Zustand store in `src/lib/auth-store.ts` with persistence.

## Form Validation

Both sign-in and sign-up pages use React Hook Form with Zod validation:

- **Sign-in**: Email and password validation
- **Sign-up**: Name, email, password, and confirm password validation with strong password requirements

## Usage

1. Set up your Appwrite project
2. Configure environment variables
3. The authentication will work automatically with the existing UI components
4. After successful login/registration, users are redirected to `/dashboard`

## Features

- ✅ Appwrite integration
- ✅ Zustand state management with persistence
- ✅ React Hook Form + Zod validation
- ✅ Responsive forms
- ✅ Error handling
- ✅ Loading states
- ✅ Dark theme support
- ✅ TypeScript support
