import { db } from "@/db/db";

export async function GET() {
  try {
    // đếm tổng ảnh active
    const count = await db.puzzleImage.count({
      where: {
        isActive: true,
      },
    });

    // không có ảnh
    if (count === 0) {
      return Response.json(
        {
          message: "Không có ảnh",
        },
        {
          status: 404,
        },
      );
    }

    // random vị trí
    const randomSkip = Math.floor(Math.random() * count);

    // lấy ảnh random
    const image = await db.puzzleImage.findFirst({
      where: {
        isActive: true,
      },

      skip: randomSkip,

      select: {
        id: true,
        link: true,
      },
    });

    return Response.json(image);
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Server error",
      },
      {
        status: 500,
      },
    );
  }
}
