"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/components/providers/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { Leaf, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { registerSchema, type RegisterFormData } from "@/lib/validations";

export default function SignUpPage() {
  const {
    register: registerUser,
    loading,
    error,
    clearError,
  } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser(data);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by the auth context
      console.error("Registration error:", err);
    }
  };

  return (
    <div className="dark:from-dark-bg dark:to-dark-surface flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card>
          <CardHeader>
            <div className="text-center">
              <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-green-400 to-green-500 p-3">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-earth-900 mb-2 text-2xl font-bold">
                Join GreenSteps
              </h1>
              <p className="text-earth-600">
                Start your eco-friendly journey today
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  icon={<User className="h-4 w-4" />}
                  {...register("name")}
                  error={errors.name?.message}
                />
              </div>

              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  icon={<Mail className="h-4 w-4" />}
                  {...register("email")}
                  error={errors.email?.message}
                />
              </div>

              <div>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  icon={<Lock className="h-4 w-4" />}
                  {...register("password")}
                  error={errors.password?.message}
                  helperText="Must contain uppercase, lowercase, and number"
                />
              </div>

              <div>
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  icon={<Lock className="h-4 w-4" />}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-3"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                fullWidth
                loading={loading || isSubmitting}
                icon={<ArrowRight className="h-4 w-4" />}
              >
                {loading || isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-earth-600">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 rounded-lg bg-green-50 p-4">
              <p className="text-center text-sm text-green-700">
                By signing up, you agree to our Terms of Service and Privacy
                Policy. Start making a positive impact on the environment today!
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
