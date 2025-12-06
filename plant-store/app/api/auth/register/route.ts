import { NextResponse } from "next/server";
import bycrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
        return NextResponse.json(
            { message: "Missing required fields" },
            { status: 400 }
        );
    }

    const hashedPassword = await bycrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });
    return NextResponse.json(user);
}