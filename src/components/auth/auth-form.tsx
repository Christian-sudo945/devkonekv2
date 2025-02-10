"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import { useToast } from "@/components/ui/use-toast";
import { AtSign, Lock, Loader2, User } from "lucide-react";
import { useTheme } from "next-themes";
import React from "react";

interface AuthFormProps {
  isSignIn: boolean;
  onSubmit: (data: any) => Promise<void>;
  onToggle: () => void;
}

export function AuthForm({ isSignIn, onSubmit, onToggle }: AuthFormProps) {
  const { theme } = useTheme();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(isSignIn ? signInSchema : signUpSchema),
  });

  const formStyles = {
    wrapper: "relative z-10 w-full max-w-md mx-auto",
    container: `p-8 rounded-2xl backdrop-blur-xl border 
      ${theme === 'dark' 
        ? 'bg-gray-950/30 border-gray-800/30 shadow-2xl' 
        : 'bg-white/70 border-gray-200/50 shadow-lg'}`,
    input: `h-12 pl-11 rounded-xl transition-all duration-200
      ${theme === 'dark'
        ? 'bg-gray-900/50 border-gray-800/30 focus:border-blue-500/50 focus:ring-blue-500/20'
        : 'bg-white/50 border-gray-200/50 focus:border-blue-500 focus:ring-blue-500/30'}`,
    button: `w-full h-12 font-medium rounded-xl transition-all duration-200
      ${theme === 'dark'
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'}`,
    socialButton: `h-12 rounded-xl transition-all duration-200
      ${theme === 'dark'
        ? 'bg-gray-900/50 border-gray-800/30 hover:bg-gray-900/70'
        : 'bg-white/50 border-gray-200/50 hover:bg-white/70'}`
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={formStyles.wrapper}
    >
      <div className={formStyles.container}>
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            {isSignIn ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSignIn ? "Sign in to continue to DevKonek" : "Join our developer community"}
          </p>
        </div>

        {/* Form Fields */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {!isSignIn && (
            <div className="grid grid-cols-2 gap-4">
              {['firstName', 'lastName'].map((field) => (
                <div key={field} className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
                  <Input
                    placeholder={field === 'firstName' ? 'First Name' : 'Last Name'}
                    {...form.register(field)}
                    className={formStyles.input}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="relative group">
            <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
            <Input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              className={formStyles.input}
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 transition-colors group-focus-within:text-blue-500" />
            <Input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className={formStyles.input}
            />
          </div>

          <Button
            type="submit"
            className={formStyles.button}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                {isSignIn ? "Sign In" : "Create Account"}
              </span>
            )}
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200/20 dark:border-gray-700/30" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-white/5 dark:bg-gray-900/50 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['google', 'github', 'twitter'].map((provider) => (
              <Button
                key={provider}
                variant="outline"
                className={formStyles.socialButton}
              >
                {React.createElement(Icons[provider as keyof typeof Icons], { className: "h-5 w-5" })}
              </Button>
            ))}
          </div>

          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            {isSignIn ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={onToggle}
              className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
            >
              {isSignIn ? "Sign up" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </motion.div>
  );
}
