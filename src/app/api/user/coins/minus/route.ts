import { db } from "@/db/db";
import { userSelect } from "@/libs/constains";

import { verifyAccessToken } from "@/libs/jwt";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");

    const token = authHeader?.split(" ")[1];

    if (!token) {
      return Response.json(
        {
          message: "Chưa đăng nhập",
        },
        {
          status: 401,
        },
      );
    }

    const payload = verifyAccessToken(token);

    if (!payload) {
      return Response.json(
        {
          message: "Token không hợp lệ",
        },
        {
          status: 401,
        },
      );
    }

    const body = await req.json();

    const { coin } = body;

    if (!coin || coin <= 0) {
      return Response.json(
        {
          message: "Coin không hợp lệ",
        },
        {
          status: 400,
        },
      );
    }

    const currentUser = await db.user.findUnique({
      where: {
        id: payload.id,
      },

      select: {
        coin: true,
      },
    });

    if (!currentUser) {
      return Response.json(
        {
          message: "Không tìm thấy user",
        },
        {
          status: 404,
        },
      );
    }

    if (currentUser.coin < coin) {
      return Response.json(
        {
          message: "Không đủ coin",
        },
        {
          status: 400,
        },
      );
    }

    const user = await db.user.update({
      where: {
        id: payload.id,
      },

      data: {
        coin: {
          decrement: coin,
        },
      },

      select: userSelect,
    });

    return Response.json(user);
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Lỗi máy chủ",
      },
      {
        status: 500,
      },
    );
  }
}
