import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const { title, file, writerId, category, estimate, content, postId } =
    Object.fromEntries(formData.entries());
  console.log("API MASUKKKKK");
  try {
    // Dapatkan postingan yang ada
    const existingPost = await Prisma.post.findUnique({
      where: {
        postId: postId,
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let filename = existingPost.thumbnail;

    // simpen file baru
    if (filename !== file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      filename = file.name;
      const filePath = path.join(process.cwd(), "public/uploads/" + filename);

      // Hapus file lama
      //   if (existingPost.thumbnail) {
      //     const oldFilePath = path.join(
      //       process.cwd(),
      //       "public/uploads/" + existingPost.thumbnail
      //     );
      //     await unlink(oldFilePath);
      //   }

      await writeFile(filePath, buffer);
    }

    let updatedPost = {};

    if (title) updatedPost.title = title;
    if (file) updatedPost.thumbnail = filename;
    if (writerId) updatedPost.writerId = writerId;
    if (category) updatedPost.category = category;
    if (estimate) updatedPost.estimate = parseInt(estimate);
    if (content) updatedPost.content = content;

    const updatePost = await Prisma.post.update({
      where: {
        postId: postId,
      },
      data: updatedPost,
    });

    let response = {
      isUpdated: updatePost.postId ? "success" : "failed",
    };
    let status = {
      status: 200,
    };
    return NextResponse.json(response, status);
  } catch (error) {
    console.log("error: " + error);
    return NextResponse.json(
      { isUpdated: false, message: error },
      { status: 501 }
    );
  }
}
