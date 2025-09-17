"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { signIn } from "next-auth/react";

export interface ActionResult {
  success?: boolean;
  errorTitle?: string | null;
  errorDesc?: string[] | null;
}

const signupSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type SignupFormValues = z.infer<typeof signupSchema>;

const signinSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export async function signupAction(
  input: SignupFormValues
): Promise<ActionResult> {
  try {
    const hashedPassword = await hash(input.password, 10);

    await prisma.user.create({
      data: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: hashedPassword,
        name: `${input.firstName} ${input.lastName}`,
      },
    });

    // langsung redirect
    redirect("/dashboard");
  } catch (err: any) {
    if (err.code === "P2002") {
      return {
        errorTitle: "Signup Failed",
        errorDesc: ["Email is already in use."],
      };
    }

    console.error("Sign in failed:", err);

    return {
      errorTitle: "Signup in Failed",
      errorDesc: ["Something went wrong. Please try again."],
    };
  }
}

export async function signinAction(
  _prevState: any,
  formData: FormData
): Promise<ActionResult> {
  const parsed = signinSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      errorTitle: "Validation Error",
      errorDesc: parsed.error.issues.map((i) => i.message),
    };
  }

  try {
    const result = await signIn("credentials", {
      ...parsed.data,
      redirect: false,
    });

    if (!result || result.error) {
      return {
        errorTitle: "Sign in Failed",
        errorDesc: ["Incorrect email or password. Please try again."],
      };
    }

    redirect("/dashboard");
  } catch (error) {
    console.error("Sign in failed:", error);

    return {
      errorTitle: "Sign in Failed",
      errorDesc: ["Something went wrong. Please try again."],
    };
  }
}

export async function getCurrentUser() {
  return null;
}
