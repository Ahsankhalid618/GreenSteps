"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { User, Edit, Save, Camera, Eye, EyeOff } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/lib/users";
import { updatePassword } from "@/lib/auth";

interface UserProfileData {
  id: string;
  userId: string;
  name: string;
  email: string;
  totalPoints: number;
  level: number;
  currentStreak: number;
  carbonSaved: number;
  waterSaved: number;
  wasteReduced: number;
  badges: string[];
  totalActions: number;
  preferences: {
    notifications: boolean;
    weeklyGoal: number;
    theme: "light" | "dark" | "auto";
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    location: "",
    website: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.$id) return;

      try {
        setLoading(true);
        const profile = await getUserProfile(user.$id);
        if (profile) {
          setUserProfile(profile);
          setFormData({
            name: profile.name || "",
            email: profile.email || "",
            bio: "",
            location: "",
            website: "",
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.$id]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleNotifications = async () => {
    if (!user?.$id || !userProfile) return;

    try {
      setUpdating(true);
      const newNotificationSetting = !userProfile.preferences?.notifications;

      const updatedProfile = await updateUserProfile(user.$id, {
        preferences: {
          ...userProfile.preferences,
          notifications: newNotificationSetting,
        },
      });

      setUserProfile(updatedProfile);
    } catch (error) {
      console.error("Error updating notification settings:", error);
    } finally {
      setUpdating(false);
    }
  };

  const handleSave = async () => {
    if (!user?.$id || !userProfile) return;

    try {
      setUpdating(true);

      // Update basic profile information
      const updatedProfile = await updateUserProfile(user.$id, {
        name: formData.name,
        email: formData.email,
      });

      setUserProfile(updatedProfile);
      setIsEditing(false);

      // Clear form data
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Error updating profile:", error);
      // You can add toast notification here
    } finally {
      setUpdating(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all password fields.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    if (formData.newPassword.length < 8) {
      alert("New password must be at least 8 characters long.");
      return;
    }

    try {
      setUpdating(true);
      await updatePassword(formData.currentPassword, formData.newPassword);

      // Clear password fields
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      alert("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      alert(
        error instanceof Error ? error.message : "Failed to update password",
      );
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || "",
        email: userProfile.email || "",
        bio: "",
        location: "",
        website: "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
    setIsEditing(false);
  };

  // Calculate level progress
  const calculateLevelProgress = (
    currentLevel: number,
    totalPoints: number,
  ) => {
    const pointsPerLevel = 1000; // Adjust based on your game logic
    const currentLevelPoints = (currentLevel - 1) * pointsPerLevel;
    const progressPoints = totalPoints - currentLevelPoints;
    const progressPercentage = Math.min(
      (progressPoints / pointsPerLevel) * 100,
      100,
    );

    return {
      percentage: Math.round(progressPercentage),
      current: progressPoints,
      target: pointsPerLevel,
      nextLevel: currentLevel + 1,
    };
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Show error state if no profile found
  if (!userProfile) {
    return (
      <div className="py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
          Profile Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Unable to load your profile data. Please try again later.
        </p>
      </div>
    );
  }

  const levelProgress = calculateLevelProgress(
    userProfile.level,
    userProfile.totalPoints,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-earth-900 dark:text-dark-text-primary text-3xl font-bold">
              Profile Settings
            </h1>
            <p className="text-earth-600 dark:text-dark-text-secondary mt-2">
              Manage your account settings and preferences accordingly.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={updating}
                  icon={updating ? null : <Save className="h-4 w-4" />}
                >
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                icon={<Edit className="h-4 w-4" />}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-blue-400/20" />
          <div className="relative flex flex-col items-center text-center lg:flex-row lg:text-left">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 ring-4 ring-white/20">
                <User className="h-16 w-16 text-white" />
              </div>
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute -right-2 -bottom-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/20 shadow-xl backdrop-blur-xl"
                >
                  <Camera className="h-5 w-5 text-white" />
                </motion.button>
              )}
            </div>

            <div className="mt-6 flex-1 lg:mt-0 lg:ml-8">
              <h1 className="mb-2 text-3xl font-bold text-white">
                {userProfile.name || "User Name"}
              </h1>
              <p className="mb-4 text-lg text-white/70">
                {userProfile.email || "user@example.com"}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm lg:justify-start">
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-xl">
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="text-white/90">Active Member</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-xl">
                  <span className="text-white/90">
                    🌱 Level {userProfile.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-6 text-center lg:mt-0">
              <div>
                <div className="text-2xl font-bold text-white">
                  {userProfile.totalPoints.toLocaleString()}
                </div>
                <div className="text-sm text-white/70">Total Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {userProfile.level}
                </div>
                <div className="text-sm text-white/70">Level</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {userProfile.currentStreak}
                </div>
                <div className="text-sm text-white/70">Day Streak</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Level Progress */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Level Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-white/70">Current Level</span>
                  <Badge
                    variant="success"
                    className="border-green-400/30 bg-green-500/20 text-green-300"
                  >
                    Level {userProfile.level}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/70">
                      Progress to Level {levelProgress.nextLevel}
                    </span>
                    <span className="font-medium text-white">
                      {levelProgress.percentage}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${levelProgress.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-500"
                    />
                  </div>
                  <div className="text-center text-xs text-white/60">
                    {levelProgress.current} / {levelProgress.target} XP to next
                    level
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                {userProfile.badges && userProfile.badges.length > 0 ? (
                  userProfile.badges.slice(0, 3).map((badge, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
                        <span className="text-lg">🏆</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">{badge}</div>
                        <div className="text-sm text-white/60">
                          Achievement unlocked
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/20">
                        <span className="text-lg">�</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          Getting Started
                        </div>
                        <div className="text-sm text-white/60">
                          Complete your first eco action
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/20">
                        <span className="text-lg">🌱</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          Eco Warrior
                        </div>
                        <div className="text-sm text-white/60">
                          Complete 10 eco actions
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500/20">
                        <span className="text-lg">🔥</span>
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          Streak Master
                        </div>
                        <div className="text-sm text-white/60">
                          Maintain a 7-day streak
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-4 text-xl font-semibold text-white">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/70">Total Actions</span>
                  <span className="font-medium text-white">
                    {userProfile.totalActions}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">CO₂ Saved</span>
                  <span className="font-medium text-white">
                    {userProfile.carbonSaved.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Water Saved</span>
                  <span className="font-medium text-white">
                    {userProfile.waterSaved.toLocaleString()} L
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Waste Reduced</span>
                  <span className="font-medium text-white">
                    {userProfile.wasteReduced.toFixed(1)} kg
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Member Since</span>
                  <span className="font-medium text-white">
                    {new Date(userProfile.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 lg:col-span-2"
          >
            {/* Personal Information */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-6 text-xl font-semibold text-white">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Full Name
                    </label>
                    <Input
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder={userProfile.name}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Email
                    </label>
                    <Input
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder={userProfile.email}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    disabled={!isEditing}
                    placeholder="Tell us about yourself..."
                    className="w-full resize-none rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-2 focus:ring-green-400/20 focus:outline-none"
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Location
                    </label>
                    <Input
                      value={formData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder="City, Country"
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Website
                    </label>
                    <Input
                      value={formData.website}
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      disabled={!isEditing}
                      placeholder="https://yourwebsite.com"
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-6 text-xl font-semibold text-white">
                Security Settings
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white/70">
                    Current Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) =>
                        handleInputChange("currentPassword", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-white/20 bg-white/5 pr-12 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-white/50 transition-colors hover:text-white/70"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      New Password
                    </label>
                    <Input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) =>
                        handleInputChange("newPassword", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-white/70">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      disabled={!isEditing}
                      className="border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-green-400/50 focus:ring-green-400/20"
                    />
                  </div>
                </div>
                {/* Password Update Button */}
                {isEditing &&
                  (formData.currentPassword ||
                    formData.newPassword ||
                    formData.confirmPassword) && (
                    <div className="pt-4">
                      <Button
                        onClick={handlePasswordUpdate}
                        disabled={
                          updating ||
                          !formData.currentPassword ||
                          !formData.newPassword ||
                          !formData.confirmPassword
                        }
                        variant="outline"
                        className="border-blue-400/50 text-blue-300 hover:bg-blue-500/20"
                      >
                        {updating ? "Updating Password..." : "Update Password"}
                      </Button>
                    </div>
                  )}
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-xl backdrop-blur-2xl">
              <h3 className="mb-6 text-xl font-semibold text-white">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <div className="font-medium text-white">
                      Email Notifications
                    </div>
                    <div className="text-sm text-white/60">
                      Receive updates about your progress
                    </div>
                  </div>
                  <button
                    onClick={toggleNotifications}
                    disabled={updating}
                    className={`relative h-6 w-12 cursor-pointer rounded-full border transition-colors ${
                      userProfile.preferences?.notifications
                        ? "border-green-400/50 bg-green-500/30"
                        : "border-white/30 bg-white/20"
                    } ${updating ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <div
                      className={`absolute top-0.5 h-5 w-5 rounded-full shadow-sm transition-all ${
                        userProfile.preferences?.notifications
                          ? "right-0.5 bg-green-400"
                          : "left-0.5 bg-white/60"
                      }`}
                    ></div>
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <div className="font-medium text-white">
                      Achievement Alerts
                    </div>
                    <div className="text-sm text-white/60">
                      Get notified when you earn badges
                    </div>
                  </div>
                  <div className="relative h-6 w-12 cursor-pointer rounded-full border border-green-400/50 bg-green-500/30">
                    <div className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-green-400 shadow-sm"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <div className="font-medium text-white">Weekly Goal</div>
                    <div className="text-sm text-white/60">
                      Current goal: {userProfile.preferences?.weeklyGoal || 5}{" "}
                      actions per week
                    </div>
                  </div>
                  <div className="relative h-6 w-12 cursor-pointer rounded-full border border-white/30 bg-white/20">
                    <div className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white/60 shadow-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
