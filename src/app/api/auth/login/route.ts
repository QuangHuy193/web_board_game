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

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return Response.json(
        {
          message: "Wrong password",
        },
        {
          status: 400,
        }
      );
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken =
      generateAccessToken(payload);

    const refreshToken =
      generateRefreshToken(payload);

    // save refresh token cookie
    (
      await cookies()
    ).set(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
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
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}