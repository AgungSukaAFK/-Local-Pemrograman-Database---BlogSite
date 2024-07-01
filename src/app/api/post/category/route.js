import Prisma from "@/lib/Prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  let res = await Prisma.post.findMany({
    select: {
      category: true,
    },
  });

  let data = res.map((cat) => {
    return cat.category.split(",");
  });

  let gabungan = [];
  data.forEach((element) => {
    gabungan.push(...element);
  });

  let scrum = gabungan.map((e) => {
    return e.trimStart().trimEnd();
  });

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const filtered = Array.from(new Set(scrum.map(capitalizeFirstLetter)));

  // console.log(filtered);

  return NextResponse.json(filtered);
}
