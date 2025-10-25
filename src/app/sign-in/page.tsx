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
    <div className="dark:from-dark-bg dark:to-dark-surface flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-1/4"
      >
        <Card className="shadow-lg w-full max-w-full">
          <CardHeader>
            <div className="text-center">
              <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-green-400 to-green-500 p-3">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-earth-900 mb-2 text-2xl font-bold">
                Welcome Back
              </h1>
              <p className="text-earth-600">
                Sign in to continue your eco-journey
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                  placeholder="Enter your password"
                  icon={<Lock className="h-4 w-4" />}
                  {...register("password")}
                  error={errors.password?.message}
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
                {loading || isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-earth-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-medium text-green-600 hover:text-green-700"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-earth-500 hover:text-earth-700 text-sm"
              >
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
