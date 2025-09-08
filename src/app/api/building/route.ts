import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const buildings = await prisma.building.findMany({
      include: { blogSections: true },
    });
    console.log(buildings);
    return NextResponse.json(buildings);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch buildings" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const building = await prisma.building.create({
      data: {
        name: body.name,
        image: body.image,
        location: body.location,
        description: body.description,
        panoramaImage: body.panoramaImage,
        rating: body.rating,
        reviews: body.reviews,
        category: body.category,
      },
    });

    return NextResponse.json(building);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create building" },
      { status: 500 }
    );
  }
}
