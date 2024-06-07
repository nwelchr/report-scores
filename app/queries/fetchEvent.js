const axios = require("axios");

const fetchEvent = async (slug) => {
  try {
    const query = `
      query getEventId($slug: String!) {
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
      {
        headers: {
          Authorization: `Bearer 930e6c4b3544d5d0f8abeb786abe072c`,
        },
      }
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
