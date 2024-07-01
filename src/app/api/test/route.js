import Prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  // By unique identifier
  try {
    return NextResponse.json(
      {
        data: "Halo",
        env: process.env.API_URL,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
