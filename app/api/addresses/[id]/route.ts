import { NextResponse } from "next/server";

interface Params {
  id: string;
}

export async function PUT(request: Request, { params }: { params: Params }) {
  const body = await request.json();
  const { id } = params;

  try {
    await prisma?.address.update({
      where: { id: id },
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
    return NextResponse.json({ message: `Address updated with id ${id}` });
  } catch (error) {
    return NextResponse.json({ message: `Cannot update address`, error });
  }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  const { id } = params;

  try {
    await prisma?.address.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: `Address deleted with id ${id}` });
  } catch (error) {
    return NextResponse.json({ message: `Cannot delete address`, error });
  }
}
