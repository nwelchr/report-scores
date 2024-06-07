import fetchEvent from "../../queries/fetchEvent";
import fetchEventStandings from "../../queries/fetchEventStandings";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  try {
    const event = await fetchEvent(slug);
    const standings = await fetchEventStandings(event.id);
    return new Response(JSON.stringify({ event, standings }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event data" }),
      { status: 500 }
    );
  }
}
