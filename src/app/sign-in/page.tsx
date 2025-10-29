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
import { Leaf, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { loginSchema, type LoginFormData } from "@/lib/validations";

export default function SignInPage() {
  const { login, loading, error, clearError } = useAuthContext();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      // Error is handled by the auth context
      console.error("Sign in error:", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-1/3"
      >
        <Card className="glass-effect w-full max-w-full bg-white/80 shadow-lg">
          <CardHeader className="pb-3">
            <div className="text-center">
              <div className="mb-2 inline-flex rounded-full bg-gradient-to-r from-green-400 to-green-500 p-2">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <h1 className="mb-1 text-lg font-bold text-gray-800">
                Welcome Back
              </h1>
              <p className="text-xs text-gray-600">
                Sign in to continue your eco-journey
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-6 pt-0 pb-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <div className="mb-1">
                  <label className="text-sm font-semibold text-gray-900">
                    Email
                  </label>
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  icon={<Mail className="h-4 w-4 text-emerald-600" />}
                  {...register("email")}
                  error={errors.email?.message}
                  className="border-emerald-600/40 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white placeholder-gray-300 backdrop-blur-sm focus:border-emerald-400 focus:ring-emerald-400/30"
                />
              </div>

              <div>
                <div className="mb-1">
                  <label className="text-sm font-semibold text-gray-900">
                    Password
                  </label>
                </div>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  icon={<Lock className="h-4 w-4 text-emerald-600" />}
                  {...register("password")}
                  error={errors.password?.message}
                  className="border-emerald-600/40 bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 text-white placeholder-gray-300 backdrop-blur-sm focus:border-emerald-400 focus:ring-emerald-400/30"
                />
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg border border-red-200 bg-red-50 p-2"
                >
                  <p className="text-xs text-red-600">{error}</p>
                </motion.div>
              )}

              <Button
                type="submit"
                fullWidth
                loading={loading || isSubmitting}
                icon={<ArrowRight className="h-4 w-4" />}
                className="my-4 bg-gradient-to-r from-green-500 to-emerald-600 py-2 font-semibold text-white hover:from-green-600 hover:to-emerald-700"
              >
                {loading || isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-3 text-center">
              <p className="text-xs text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-2 text-center">
              <Link
                href="/forgot-password"
                className="text-xs text-gray-500 underline decoration-dotted transition-colors hover:text-green-600"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="mt-2 rounded-lg bg-green-50 p-2">
              <p className="text-center text-xs text-green-700">
                Welcome back to your sustainability journey! 🌍
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
