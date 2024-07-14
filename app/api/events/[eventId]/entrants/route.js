import fetchEntrants from "queries/fetchEntrants";

export async function GET(req, { params }) {
  const { eventId } = params;

  if (!eventId) {
    return new Response(JSON.stringify({ error: "Missing eventId" }), {
      status: 400,
    });
  }

  try {
    const entrants = await fetchEntrants(eventId);
    return new Response(JSON.stringify(entrants), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event data" }),
      { status: 500 },
    );
  }
}
