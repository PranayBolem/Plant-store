import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const plants = await prisma.plant.findMany({
            include: { images:true },
        });
        return NextResponse.json(plants, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch plants" },
            { status: 500 }
        );
    }
}