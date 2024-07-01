import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";

export async function GET(req) {
  let searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("id");

  if (!userId) {
    const user = await Prisma.user.findMany({
      where: {
        role: "WRITER",
      },
      select: {
        username: true,
        userId: true,
      },
    });
    return NextResponse.json({
      data: {
        user,
      },
    });
  }

  const user = await Prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (user) {
    return NextResponse.json({
      data: {
        userId: user.userId,
        username: user.username,
        role: user.role,
      },
    });
  } else {
    return NextResponse.json({
      data: {
        message: "user not found",
      },
    });
  }
}
