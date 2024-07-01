import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";

export async function GET(req) {
  const searchParams = await req.nextUrl.searchParams;
  const searchURI = searchParams.get("search");
  if (!searchURI) {
    let writerId = searchParams.get("from");
    if (!writerId) {
      return NextResponse.json(
        { error: "parameter is required" },
        { status: 400 }
      );
    }

    const posts = await Prisma.post.findMany({
      where: {
        writerId: writerId,
      },
    });

    return NextResponse.json({
      post: (await posts) ? posts : null,
    });
  } else if (searchURI) {
    let search = decodeURIComponent(searchURI);
    const searchTerms = search.split(" ").filter((term) => term.length > 0);

    // Create dynamic search conditions
    const searchConditions = searchTerms.map((term) => ({
      OR: [
        { title: { contains: term } },
        { content: { contains: term } },
        { category: { contains: term } },
        { writerId: { contains: term } },
      ],
    }));

    try {
      const post = await Prisma.post.findMany({
        where: {
          AND: searchConditions,
        },
      });

      let response = {
        post: (await post) ? post : null,
      };
      let status = {
        status: 200,
      };
      return NextResponse.json(response, status);
    } catch (error) {
      console.log("error: " + error);
      return NextResponse.json({ error }, { status: 501 });
    }
  }
}

// const createUser = await prisma.user.create({ data: user })
