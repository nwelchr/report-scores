const axios = require("axios");
const { headers } = require("./constants");

const fetchEventStandings = async (eventId, page = 1, perPage = 50) => {
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
                participants {
                  player {
                    id
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = { eventId, page, perPage };

    const response = await axios.post(
      "https://api.start.gg/gql/alpha",
      { query, variables },
      { headers }
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
