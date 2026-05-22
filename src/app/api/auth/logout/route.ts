import { cookies } from "next/headers";

import { db } from "@/db/db";

export async function POST() {
  try {
    const refreshToken = (
      await cookies()
    ).get("refreshToken")?.value;

    // xóa session DB
    if (refreshToken) {
      await db.session.deleteMany({
        where: {
          refreshToken,
        },
      });
    }

    // xóa cookie
    (
      await cookies()
    ).set("refreshToken", "", {
      httpOnly: true,

      expires: new Date(0),

      path: "/",
    });

    return Response.json({
      message: "Logout success",
    });
  } catch (error) {
    return Response.json(
      {
        message: "Logout failed",
      },
      {
        status: 500,
      }
    );
  }
}