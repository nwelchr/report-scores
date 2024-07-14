const axios = require("axios");

const fetchEntrants = async (eventId, page = 1, perPage = 50) => {
  const query = `
     query EventStandings($eventId: ID!, $page: Int!, $perPage: Int!) {
      event(id: $eventId) {
        id
        name
        standings(query: {perPage: $perPage, page: $page}) {
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
    page,
    perPage,
  };

  try {
    const response = await axios.post(
      "https://api.start.gg/gql/alpha",
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_START_GG_API_TOKEN}`,
        },
      },
    );

    const standings = response.data.data.event.standings.nodes;
    const entrants = standings.map((node) => ({
      id: node.entrant.id,
      name: node.entrant.name,
      seed: node.entrant.seeds[0].seedNum,
      placement: node.placement,
    }));

    return entrants;
  } catch (error) {
    console.error("Error fetching entrants:", error);
    throw error;
  }
};

export default fetchEntrants;
