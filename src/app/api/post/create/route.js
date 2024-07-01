import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const { title, file, writerId, category, estimate, content } =
    Object.fromEntries(formData.entries());

  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name;
    const filePath = path.join(process.cwd(), "public/uploads/" + filename);

    await writeFile(filePath, buffer);
    console.log("berhasil masukin file");
    let newPost = {
      title,
      thumbnail: filename,
      writerId,
      category,
      estimate: parseInt(estimate),
      content,
    };
    const createPost = await Prisma.post.create({
      data: newPost,
    });
    console.log("berhasil masukin ke db");

    let response = {
      isCreated: createPost.postId ? "success" : "failed",
    };
    let status = {
      status: 200,
    };
    return NextResponse.json(status);
    // return NextResponse.json(response, status);
  } catch (error) {
    console.log("error: " + error);
    return NextResponse.json({ error }, { status: 501 });
  }
}
