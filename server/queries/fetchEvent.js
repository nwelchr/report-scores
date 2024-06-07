// server/fetchEvent.js
const axios = require("axios");
const { headers } = require("./constants");

const fetchEvent = async (slug) => {
  try {
    const query = `
      query getEventId($slug: String) {
        event(slug: $slug) {
          id
          name
        }
      }
    `;

    const variables = { slug };

    const response = await axios.post(
      "https://api.start.gg/gql/alpha",
      { query, variables },
      { headers }
    );

    return response.data.data.event;
  } catch (error) {
    console.error(
      "Error fetching event:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch event");
  }
};

module.exports = fetchEvent;
