import reportSet from "app/queries/reportSet";

export async function POST(req, { params }) {
  const { eventId } = params;
  const { setId, winnerId, gameData } = await req.json();

  if (!eventId || !setId || !winnerId || !gameData) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
      }
    );
  }

  try {
    const result = await reportSet({
      setId,
      winnerId,
      gameData,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to report set" }), {
      status: 500,
    });
  }
}
