import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Prisma from "@/lib/Prisma";

export async function POST(req) {
  /*
    1. Get data from request
    2. Hash password
    3. Save to database with hashed password
    4. Return response
    */
  try {
    const { userId, username, password, role } = await req.json();

    let check = await fetch("http://localhost:3000/api/auth/validation", {
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    let result = await check.json();
    let { isValid } = result;

    if (isValid) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        userId,
        username,
        password: hashedPassword,
        role,
      };
      await Prisma.user.create({ data: newUser });
    } else {
      return NextResponse.json({
        create: "failed",
        message: "userid already exist",
      });
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ create: "failed", message: error })
    );
  }

  return new NextResponse(
    JSON.stringify({
      create: "success",
      message: "user crated",
    })
  );
}

/*
body: {
  userId,
  username,
  password,
  role,
}
*/
