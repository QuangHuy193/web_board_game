import { db } from "@/db/db";
import { userSelect } from "@/libs/constains";

import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, password } = body;

    if (!name || !email || !password) {
      return Response.json(
        {
          message: "Missing fields",
        },
        {
          status: 400,
        },
      );
    }

    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            name,
          },
        ],
      },
    });

    if (existingUser) {
      return Response.json(
        {
          message: "User already exists",
        },
        {
          status: 400,
        },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: userSelect,
    });

    return Response.json(user);
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
