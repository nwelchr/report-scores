import fetchEvent from "queries/fetchEvent";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
    });
  }

  try {
    const event = await fetchEvent(slug);
    return new Response(JSON.stringify({ event }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch event data" }),
      { status: 500 }
    );
  }
}
