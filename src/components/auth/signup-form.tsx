"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, User, Phone, Mail, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export function SignUpForm() {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthday: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading skeleton
  }

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sign up");
      }

      toast({
        title: "Account created successfully!",
        description: "Please sign in with your credentials",
      });

      // Redirect or handle successful signup
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to sign up",
        variant: "destructive",
      });
    }
  };

  const inputClasses = "h-11 bg-white/5 dark:bg-gray-800/30 border-gray-200/20 dark:border-gray-700/30 rounded-xl pl-10";

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Names */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="First Name"
            {...form.register("firstName")}
            className={inputClasses}
          />
          {form.formState.errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.firstName.message}</p>
          )}
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Middle Name (Optional)"
            {...form.register("middleName")}
            className={inputClasses}
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Last Name"
            {...form.register("lastName")}
            className={inputClasses}
          />
          {form.formState.errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{form.formState.errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div className="relative">
        <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="email"
          placeholder="Email"
          {...form.register("email")}
          className={inputClasses}
        />
        {form.formState.errors.email && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
        )}
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="tel"
          placeholder="Phone Number"
          {...form.register("phoneNumber")}
          className={inputClasses}
        />
        {form.formState.errors.phoneNumber && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Birthday */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              inputClasses,
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Date of Birth</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => {
              setDate(date);
              form.setValue("birthday", date?.toISOString() || "");
            }}
            disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Password Fields */}
      <div className="relative">
        <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="password"
          placeholder="Password"
          {...form.register("password")}
          className={inputClasses}
        />
        {form.formState.errors.password && (
          <p className="text-sm text-red-500 mt-1">{form.formState.errors.password.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-11"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
