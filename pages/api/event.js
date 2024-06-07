import fetchEvent from "../../queries/fetchEvent";
import fetchEventStandings from "../../queries/fetchEventStandings";

export default async function handler(req, res) {
  const { slug } = req.query;

  console.log("API route hit:", slug); // Debugging log

  if (!slug) {
    return res.status(400).json({ error: "Missing slug" });
  }

  try {
    const event = await fetchEvent(slug);
    const standings = await fetchEventStandings(event.id);
    res.status(200).json({ event, standings });
  } catch (error) {
    console.error("Error fetching event data:", error);
    res.status(500).json({ error: "Failed to fetch event data" });
  }
}
