"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SignUpInput, SignInInput } from "@/lib/validations/auth";
import { signUpSchema, signInSchema } from "@/lib/validations/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { Mail, Lock, User, Loader2, AtSign, Phone } from "lucide-react";
import { CountrySelect } from "@/components/ui/country-select";

export default function AuthPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [phonePrefix, setPhonePrefix] = useState("+1");

  const signInForm = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      phonePrefix: "+1",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  const handleSocialSignIn = async (provider: string) => {
    try {
      setSocialLoading(provider);
      await signIn(provider, { callbackUrl: "/home" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with " + provider,
        variant: "destructive",
      });
    } finally {
      setSocialLoading(null);
    }
  };

  const onSignIn = async (data: SignInInput) => {
    try {
      setIsLoading(true);
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      router.push("/home");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    } 
  };

  const onSignUp = async (data: SignUpInput) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, phonePrefix }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign up");
      }

      toast({
        title: "Success",
        description: "Account created successfully!",
      });

      // Switch to sign in view
      setIsSignIn(true);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formStyles = {
    wrapper: "w-full max-w-md p-6 rounded-2xl shadow-xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20",
    input: "pl-10 h-11 bg-white/5 dark:bg-gray-800/30 border-gray-200/20 dark:border-gray-700/30 rounded-xl",
    button: "h-11 font-medium",
    icon: "absolute left-3 top-3.5 h-4 w-4 text-muted-foreground",
    socialButton: "flex-1 h-11 bg-white/5 dark:bg-gray-800/30 hover:bg-white/10 dark:hover:bg-gray-800/40",
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-background to-muted">
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="ghost"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Create Account" : "Sign In"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
          {/* Hero Section */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold">
              Connect with Developers{" "}
              <span className="text-primary">Worldwide</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join our community to collaborate, share knowledge, and build amazing projects together.
            </p>
          </div>

          {/* Auth Forms */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignIn ? "signin" : "signup"}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={formStyles.wrapper}
            >
              {isSignIn ? (
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-4">
                  <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <AtSign className={formStyles.icon} />
                      <Input
                        type="email"
                        placeholder="Email"
                        {...signInForm.register("email")}
                        className={formStyles.input}
                      />
                    </div>

                    <div className="relative">
                      <Lock className={formStyles.icon} />
                      <Input
                        type="password"
                        placeholder="Password"
                        {...signInForm.register("password")}
                        className={formStyles.input}
                      />
                    </div>
                  </div>

                  <Button type="submit" className={formStyles.button} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200/20 dark:border-gray-700/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="px-2 bg-background text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {["google", "github"].map((provider) => (
                      <Button
                        key={provider}
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn(provider)}
                        disabled={!!socialLoading}
                        className={formStyles.socialButton}
                      >
                        {socialLoading === provider ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          Icons[provider as keyof typeof Icons]({ className: "h-5 w-5" })
                        )}
                      </Button>
                    ))}
                  </div>
                </form>
              ) : (
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-4">
                  <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="relative">
                      <User className={formStyles.icon} />
                      <Input
                        placeholder="First Name"
                        {...signUpForm.register("firstName")}
                        className={formStyles.input}
                      />
                      {signUpForm.formState.errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">
                          {signUpForm.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <User className={formStyles.icon} />
                      <Input
                        placeholder="Middle Name"
                        {...signUpForm.register("middleName")}
                        className={formStyles.input}
                      />
                    </div>

                    <div className="relative">
                      <User className={formStyles.icon} />
                      <Input
                        placeholder="Last Name"
                        {...signUpForm.register("lastName")}
                        className={formStyles.input}
                      />
                      {signUpForm.formState.errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">
                          {signUpForm.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <AtSign className={formStyles.icon} />
                    <Input
                      type="email"
                      placeholder="Email"
                      {...signUpForm.register("email")}
                      className={formStyles.input}
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="text-sm text-red-500 mt-1">
                        {signUpForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <CountrySelect onSelect={setPhonePrefix} />
                    <div className="relative flex-1">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        {...signUpForm.register("phoneNumber")}
                        className={formStyles.input}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative">
                      <Lock className={formStyles.icon} />
                      <Input
                        type="password"
                        placeholder="Password"
                        {...signUpForm.register("password")}
                        className={formStyles.input}
                      />
                      {signUpForm.formState.errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {signUpForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <Lock className={formStyles.icon} />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...signUpForm.register("confirmPassword")}
                        className={formStyles.input}
                      />
                      {signUpForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">
                          {signUpForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <Button type="submit" className={formStyles.button} disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign Up"}
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200/20 dark:border-gray-700/20" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="px-2 bg-background text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {["google", "github"].map((provider) => (
                      <Button
                        key={provider}
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn(provider)}
                        disabled={!!socialLoading}
                        className={formStyles.socialButton}
                      >
                        {socialLoading === provider ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          Icons[provider as keyof typeof Icons]({ className: "h-5 w-5" })
                        )}
                      </Button>
                    ))}
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
