import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const { id } = params;

  try {
    await prisma?.user.update({
      where: {
        id: id,
      },
      data: {
        email: body.email,
        name: body.name,
        lastname: body.lastname,
        password: body.password,
      },
    });
    return NextResponse.json({ message: `User updated with id ${id}` });
  } catch (error) {
    return NextResponse.json({ message: `Cannot update user`, error });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    await prisma?.user.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: `User deleted with id ${id}` });
  } catch (error) {
    return NextResponse.json({ message: `Cannot delete user`, error });
  }
}
