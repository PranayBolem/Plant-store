import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

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

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== "ADMIN") {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { name, description, price, stock, imageUrl } = body;

        const plant = await prisma.plant.create({
            data: {
                name,
                description,
                price,
                stock,
                images: { create: { url: imageUrl } },
            },
        });

        return NextResponse.json(plant, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to create plant" },
            { status: 500 }
        );
    }
}