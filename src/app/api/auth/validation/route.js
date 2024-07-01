import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";

export async function POST(req) {
  /*
    1. Ambil userId dari req
    2. Cek apakah ada di db
    3. Kembalikan kebenarannya
    */

  let isValid = false;

  let { userId: userIdReq } = await req.json();
  let user = await Prisma.user.findUnique({
    where: {
      userId: userIdReq,
    },
  });

  user ? (isValid = false) : (isValid = true);

  return NextResponse.json({
    isValid,
  });
}

/**
 * body: {
 *  userId
 * }
 */
