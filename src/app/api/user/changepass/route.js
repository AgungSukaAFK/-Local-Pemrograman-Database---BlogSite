import { NextResponse } from "next/server";
import Prisma from "@/lib/Prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  let { purpose, userId, oldPassword, newPassword } = await req.json();

  if (purpose === "check") {
    return checkOldPass(userId, oldPassword);
  } else if (purpose === "change") {
    return changePass(userId, newPassword);
  }

  async function checkOldPass(id, pass) {
    let user = await Prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    let isValid;
    if (user) {
      let { password: oldPass } = user;
      isValid = await bcrypt.compare(pass, oldPass);
      return NextResponse.json({
        isValid,
        message: isValid
          ? "Old password is valid"
          : "Old password is not valid",
      });
    } else {
      return NextResponse.json({
        isValid: false,
        message: "User not found",
      });
    }
  }

  async function changePass(id, pass) {
    let user = await Prisma.user.findUnique({
      where: {
        userId: id,
      },
    });
    if (user) {
      const hashedPassword = await bcrypt.hash(pass, 10);
      await Prisma.user.update({
        where: {
          userId: id,
        },
        data: {
          password: hashedPassword,
        },
      });
      return NextResponse.json({
        success: true,
        message: "Password changed successfully",
      });
    }
  }
}
// check:
// {
// 	"purpose": "check",
// 	"userId": "agung",
// 	"oldPassword": "anjayg123"
// }

// change:
// {
// 	"purpose": "change",
// 	"userId": "agung",
// 	"newPassword": "anjay"
// }
