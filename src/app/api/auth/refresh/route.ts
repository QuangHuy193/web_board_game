import { cookies } from "next/headers";

import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/libs/jwt";

export async function POST() {
  try {
    const refreshToken = (
      await cookies()
    ).get("refreshToken")?.value;

    if (!refreshToken) {
      return Response.json(
        {
          message: "No refresh token",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      verifyRefreshToken(refreshToken) as {
        id: string;
        email: string;
        role: string;
      };

    const accessToken =
      generateAccessToken({
        id: payload.id,
        email: payload.email,
        role: payload.role,
      });

    return Response.json({
      accessToken,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Invalid refresh token",
      },
      {
        status: 401,
      }
    );
  }
}