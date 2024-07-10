import reportSet from "@/app/queries/reportSet";

export async function POST(req, { params }) {
  const { eventId } = params;
  const { setId, winnerId, entrantScore, opponentScore } = await req.json();

  if (
    !eventId ||
    !setId ||
    !winnerId ||
    entrantScore === undefined ||
    opponentScore === undefined
  ) {
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
      entrantScore,
      opponentScore,
    });

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to report set" }), {
      status: 500,
    });
  }
}
