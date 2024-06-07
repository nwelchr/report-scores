const express = require("express");
const cors = require("cors");
const path = require("path");
const fetchEvent = require("./queries/fetchEvent");
const fetchEventStandings = require("./queries/fetchEventStandings");
const app = express();
const PORT = process.env.PORT || 5001;

// Use CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// REST endpoint to get event data
app.get("/api/event", async (req, res) => {
  const { slug } = req.query;
  try {
    const event = await fetchEvent(slug);
    const standings = await fetchEventStandings(event.id);
    res.json({ event, standings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch event data" });
  }
});

// An example API endpoint
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from the server!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
