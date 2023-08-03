import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const addresses = await prisma.address.findMany();

  return NextResponse.json(addresses);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    if (body) {
      const address = await prisma.address.create({
        data: {
          alias: body.alias,
          address1: body.address1,
          address2: body.address2,
          city: body.city,
          state: body.state,
          postcode: body.postcode,
          phone: body.phone,
        },
      });
      return NextResponse.json({
        message: `Address created with id ${address.id}`,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Cannot create address" });
  }
}
