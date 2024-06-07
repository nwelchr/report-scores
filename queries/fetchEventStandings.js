const axios = require("axios");

const fetchEventStandings = async (eventId) => {
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
          Authorization: `Bearer 930e6c4b3544d5d0f8abeb786abe072c`, // Replace with your actual API key
        },
      }
    );

    return response.data.data.event.standings.nodes;
  } catch (error) {
    console.error(
      "Error fetching event standings:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch event standings");
  }
};

module.exports = fetchEventStandings;
