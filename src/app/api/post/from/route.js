// import { NextResponse } from "next/server";
// import Prisma from "@/lib/Prisma";

// export async function GET(req) {
//   let searchParams = req.nextUrl.searchParams;
//   const userId = searchParams.get("id");

//   const posts = await Prisma.post.findMany({
//     where: {
//       userId: userId,
//     },
//   });
// }
