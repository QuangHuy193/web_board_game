import { db } from "@/db/db";

export async function GET() {
  try {
    const games = await db.game.findMany({
      include: {
        configs: true,
      },
    });

    return Response.json(games);
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}