const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5001;

// Use CORS
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../client/build")));

// An example API endpoint
app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello from the serverr!" });
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
