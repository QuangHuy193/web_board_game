import { db } from "@/db/db";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      email,
      password,
    } = body;

    if (!email || !password) {
      return Response.json(
        {
          message: "Missing fields",
        },
        {
          status: 400,
        }
      );
    }

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

    return Response.json({
      message: "Login success",
      user,
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