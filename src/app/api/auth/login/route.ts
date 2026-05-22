import bcrypt from "bcryptjs";

import { cookies } from "next/headers";

import { db } from "@/db/db";

import {
  generateAccessToken,
  generateRefreshToken,
} from "@/libs/jwt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // tìm user
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    // sai email hoặc password
    if (!user) {
      return Response.json(
        {
          message:
            "Tài khoản hoặc mật khẩu không chính xác!",
        },
        {
          status: 401,
        }
      );
    }

    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return Response.json(
        {
          message:
            "Tài khoản hoặc mật khẩu không chính xác!",
        },
        {
          status: 401,
        }
      );
    }

    // payload
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // generate token
    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    // lưu session DB
    await db.session.create({
      data: {
        userId: user.id,

        refreshToken,

        expiresAt: new Date(
          Date.now() +
            1000 *
              60 *
              60 *
              24 *
              7
        ),
      },
    });

    // save refresh token cookie
    (
      await cookies()
    ).set(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          60 * 60 * 24 * 7,
      }
    );

    return Response.json({
      accessToken,

      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        coin: user.coin,
      },
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Lỗi máy chủ",
      },
      {
        status: 500,
      }
    );
  }
}