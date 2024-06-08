import fetchEventDetails from "@/app/queries/fetchEventDetails";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  if (!eventId) {
    return new Response(JSON.stringify({ error: "Missing eventId" }), {
      status: 400,
    });
  }

  try {
    const event = await fetchEventDetails(eventId);
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event data" }),
      { status: 500 }
    );
  }
}
