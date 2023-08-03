import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
    if (body) {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          lastname: body.lastname,
          password: body.password,
        },
      });
      return NextResponse.json({ message: `User created with id ${user.id}` });
    }
  } catch (error) {
    return NextResponse.json({ message: `Cannot create user`, error });
  }
}
