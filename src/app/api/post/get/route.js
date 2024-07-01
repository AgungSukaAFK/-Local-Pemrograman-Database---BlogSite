// import { NextResponse } from "next/server";
// import Prisma from "@/lib/Prisma";

// export async function POST(req) {
//   const { postId } = await req.json();
//   console.log(postId);
//   try {
//     const post = await Prisma.post.findUnique({
//       where: {
//         postId: postId,
//       },
//     });

//     let response = {
//       post, //Jika tidak ada maka retun null
//     };
//     let status = {
//       status: 200,
//     };
//     return NextResponse.json(response, status);
//   } catch (error) {
//     console.log("error: " + error);
//     return NextResponse.json({ error }, { status: 501 });
//   }
// }

// export async function GET(req) {
//   let posts = await Prisma.post.findMany(); // returns array of objects
//   return NextResponse.json(posts);
// }

// // const createUser = await prisma.user.create({ data: user })

import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";

export async function POST(req) {
  const { postId } = await req.json();
  console.log("POST request received with postId:", postId);
  try {
    const post = await Prisma.post.findUnique({
      where: {
        postId: postId,
      },
    });

    console.log("Fetched post:", post);
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.log("Error fetching post:", error);
    return NextResponse.json({ error }, { status: 501 });
  }
}

export async function GET() {
  try {
    let posts = await Prisma.post.findMany(); // returns array of objects
    console.log("Fetched posts:", posts);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
