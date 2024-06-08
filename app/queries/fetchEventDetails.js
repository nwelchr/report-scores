const axios = require("axios");

const fetchEventDetails = async (eventId) => {
  try {
    const query = `
      query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {
        event(id: $eventId) {
          id
          name
          standings(query: { perPage: $perPage, page: $page }) {
            nodes {
              placement
              entrant {
                id
                name
                seeds {
                  seedNum
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      eventId,
      page: 1,
      perPage: 50,
    };

    const response = await axios.post(
      "https://api.start.gg/gql/alpha",
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_START_GG_API_TOKEN}`,
        },
      }
    );

    return response.data.data.event;
  } catch (error) {
    console.error(
      "Error fetching event details:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch event details");
  }
};

module.exports = fetchEventDetails;
