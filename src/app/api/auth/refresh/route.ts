import { cookies } from "next/headers";

import { db } from "@/db/db";

import { generateAccessToken, verifyRefreshToken } from "@/libs/jwt";

export async function POST() {
  try {
    // lấy refresh token từ cookie
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    if (!refreshToken) {
      return Response.json(
        {
          message: "No refresh token",
        },
        {
          status: 401,
        },
      );
    }

    // verify jwt
    const payload = verifyRefreshToken(refreshToken) as {
      id: string;
      email: string;
      role: string;
    };

    // check session DB
    const session = await db.session.findUnique({
      where: {
        refreshToken,
      },

      include: {
        user: true,
      },
    });

    // không có session
    if (!session) {
      return Response.json(
        {
          message: "Session not found",
        },
        {
          status: 401,
        },
      );
    }

    // session hết hạn
    if (session.expiresAt < new Date()) {
      // xóa session cũ
      await db.session.delete({
        where: {
          id: session.id,
        },
      });

      return Response.json(
        {
          message: "Session expired",
        },
        {
          status: 401,
        },
      );
    }

    // generate access token mới
    const accessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

    return Response.json({
      accessToken,

      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        coin: session.user.coin,
      },
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Invalid refresh token",
      },
      {
        status: 401,
      },
    );
  }
}
