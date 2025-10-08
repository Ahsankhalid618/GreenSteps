"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { User, Settings, Edit, Save, Camera, Eye, EyeOff } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: "",
    location: "",
    website: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // TODO: Implement profile update logic
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      bio: "",
      location: "",
      website: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setIsEditing(false);
  };

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
              Manage your account settings and preferences.
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
                  icon={<Save className="h-4 w-4" />}
                >
                  Save Changes
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardHeader title="Profile Overview" />
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="dark:bg-dark-surface absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg"
                    >
                      <Camera className="h-4 w-4 text-green-600" />
                    </motion.button>
                  )}
                </div>
                <h3 className="text-earth-900 dark:text-dark-text-primary mt-4 text-xl font-semibold">
                  {user?.name || "User Name"}
                </h3>
                <p className="text-earth-600 dark:text-dark-text-secondary">
                  {user?.email || "user@example.com"}
                </p>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-earth-600 dark:text-dark-text-secondary">
                    Level
                  </span>
                  <Badge variant="success">Level 3</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-600 dark:text-dark-text-secondary">
                    Points
                  </span>
                  <span className="text-earth-900 dark:text-dark-text-primary font-medium">
                    2,450
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-600 dark:text-dark-text-secondary">
                    Streak
                  </span>
                  <span className="text-earth-900 dark:text-dark-text-primary font-medium">
                    7 days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-600 dark:text-dark-text-secondary">
                    Member Since
                  </span>
                  <span className="text-earth-900 dark:text-dark-text-primary font-medium">
                    Jan 2024
                  </span>
                </div>
              </div>

              {/* Progress to Next Level */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-earth-600 dark:text-dark-text-secondary">
                    Progress to Level 4
                  </span>
                  <span className="text-earth-900 dark:text-dark-text-primary font-medium">
                    65%
                  </span>
                </div>
                <ProgressBar value={65} variant="gradient" showLabel={false} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 lg:col-span-2"
        >
          {/* Personal Information */}
          <Card>
            <CardHeader title="Personal Information" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    Full Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    Email
                  </label>
                  <Input
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  className="text-earth-900 placeholder:text-earth-500 dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-primary dark:placeholder:text-dark-text-muted mt-1 w-full rounded-lg border border-green-200 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 focus:outline-none dark:focus:border-green-400"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    Location
                  </label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="City, Country"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    Website
                  </label>
                  <Input
                    value={formData.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    disabled={!isEditing}
                    placeholder="https://yourwebsite.com"
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader title="Security Settings" />
            <CardContent className="space-y-4">
              <div>
                <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                  Current Password
                </label>
                <div className="relative mt-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) =>
                      handleInputChange("currentPassword", e.target.value)
                    }
                    disabled={!isEditing}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-earth-400 hover:text-earth-600 absolute top-1/2 right-3 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    New Password
                  </label>
                  <Input
                    type="password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleInputChange("newPassword", e.target.value)
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-earth-700 dark:text-dark-text-secondary text-sm font-medium">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader title="Preferences" />
            <CardContent>
              <div className="py-8 text-center">
                <Settings className="text-earth-400 mx-auto mb-4 h-12 w-12" />
                <h3 className="text-earth-900 dark:text-dark-text-primary mb-2 text-lg font-medium">
                  Preferences Coming Soon!
                </h3>
                <p className="text-earth-600 dark:text-dark-text-secondary">
                  We&apos;re working on notification settings, theme
                  preferences, and more customization options.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
