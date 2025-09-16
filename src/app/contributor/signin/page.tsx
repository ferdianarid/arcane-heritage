/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { signinAction } from "@/servers/actions/auth/actions";
import Link from "next/link";
import { toast } from "sonner";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function SubmitButton({ isGoogleLoading }: { isGoogleLoading: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending || isGoogleLoading}
      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Signing in...
        </>
      ) : (
        "Sign in"
      )}
    </Button>
  );
}

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [state, formAction] = useActionState(signinAction, {
    errorTitle: null,
    errorDesc: [],
  });

  useEffect(() => {
    if (!state.errorTitle) {
      toast.success("Login successful!", {
        description: "You are being redirected to the dashboard.",
      });
    } else if (state.errorTitle && state.errorDesc?.[0]) {
      toast.error(state.errorTitle, {
        description: state.errorDesc[0],
      });
      form.setError("email", {
        type: "server",
        message: state.errorDesc[0],
      });
      form.setError("password", {
        type: "server",
        message: state.errorDesc[0],
      });
    }
  }, [state, form]);

  useEffect(() => {
    if (form.formState.isDirty) {
      form.clearErrors();
    }
  }, [form.watch(), form.formState.isDirty, form]);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Google sign in");
    setIsGoogleLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-black text-gray-200">
      {/* Left Section - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="w-full  max-w-[550px] space-y-8 bg-[#0f1022] rounded-xl p-8 border border-gray-800 shadow-2xl">
          {/* Logo */}
          <div className="text-center">
            <div className="w-fit grid gap-2 mx-auto">
              <BlurFade delay={0.25}>
                <Link href="/" className="flex items-center space-x-2">
                  <h1
                    className={cn(
                      "font-normal font-italianno leading-tight transition-all duration-300 text-[64px]"
                    )}
                  >
                    ArcaneHeritage
                  </h1>
                </Link>
              </BlurFade>
              <p className="text-base font-normal text-white">
                Please login first to contribute
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form action={formAction} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-400">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Email or phone number"
                        className="h-12 bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500"
                        disabled={isGoogleLoading}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-400">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter password"
                          className="h-12 bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:ring-blue-500 pr-10"
                          disabled={isGoogleLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                          disabled={isGoogleLoading}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400 text-sm" />
                  </FormItem>
                )}
              />

              {/* Forgot Password Link */}
              <div className="flex items-center justify-end">
                <a
                  href="/forgot-password"
                  className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                >
                  Forgot password?
                </a>
              </div>

              {/* Tombol Sign In */}
              <SubmitButton isGoogleLoading={isGoogleLoading} />

              {/* Google Sign In Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full h-12 border-gray-700 text-gray-200 hover:bg-gray-800 font-medium rounded-lg transition-colors"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </>
                )}
              </Button>

              {/* Sign Up Link */}
              <div className="text-center">
                <span className="text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Sign up now
                  </Link>
                </span>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
