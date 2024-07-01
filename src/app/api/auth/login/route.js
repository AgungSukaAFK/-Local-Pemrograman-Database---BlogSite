import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Prisma from "@/lib/Prisma";

export async function POST(req) {
  const { userId, password } = await req.json();

  const user = await Prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (user) {
    let { password: dbPassword } = user;
    const check = await bcrypt.compare(password, dbPassword);
    if (check) {
      return NextResponse.json({ success: true, message: "Login successful" });
    } else {
      return NextResponse.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } else {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }
}

/*
body: {
  userId,
  password
}
*/
