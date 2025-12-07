import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import {prisma} from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { plantId, quantity } = await request.json();
        if (!plantId || quantity < 1) return NextResponse.json(
            { message: "Invalid plant ID or quantity" },
            { status: 400 }
        );

        // Get or create cart for the user
        let cart = await prisma.cart.findUnique({
            where: { userId: session.user.id },
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId: session.user.id },
            });
        }

        // check if the plant is already in the cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                plantId: plantId,
            },
        });

        if (existingItem) {
            // Update quantity if item already exists
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
            });
        } else {
            // Add new item to cart
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    plantId: plantId,
                    quantity: quantity,
                },
            });
        }

        return NextResponse.json(
            { message: "Plant added to cart successfully" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to add plant to cart" },
            { status: 500 }
        );
    }
}