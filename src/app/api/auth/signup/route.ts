/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // validasi basic
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // cek email existing
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 } // lebih tepat daripada 400
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
      }, // jangan return password ke client
    });

    return NextResponse.json(
      { message: "Signup success", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup API error:", error);

    // Prisma unique constraint error
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Something went wrong", detail: error.message },
      { status: 500 }
    );
  }
}
