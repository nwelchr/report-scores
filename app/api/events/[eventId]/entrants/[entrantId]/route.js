import fetchEntrantSets from "@/app/queries/fetchEntrantSets";

export async function GET(req, { params }) {
  const { eventId, entrantId } = params;

  if (!eventId || !entrantId) {
    return new Response(
      JSON.stringify({ error: "Missing eventId or entrantId" }),
      {
        status: 400,
      }
    );
  }

  try {
    const sets = await fetchEntrantSets(eventId, entrantId);
    return new Response(JSON.stringify(sets), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch entrant sets" }),
      { status: 500 }
    );
  }
}
