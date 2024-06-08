import axios from "axios";

const fetchEntrantSets = async (eventId, entrantId) => {
  const response = await axios.post(
    "https://api.smash.gg/gql/alpha",
    {
      query: `
      query EntrantSets($eventId: ID!, $entrantId: ID!, $page: Int!, $perPage: Int!) {
        event(id: $eventId) {
          name
        }
        entrant(id: $entrantId) {
          id
          name
          paginatedSets(page: $page, perPage: $perPage) {
            pageInfo {
              total
              totalPages
            }
            nodes {
              id
              event {
                id
                name
              }
              round
              slots {
                entrant {
                  id
                  name
                  seeds {
                    seedNum
                  }
                }
              }
              displayScore
              state
              winnerId
            }
          }
        }
      }
    `,
      variables: {
        eventId,
        entrantId,
        page: 1,
        perPage: 10,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_START_GG_API_TOKEN}`,
      },
    }
  );

  return response.data.data;
};

export default fetchEntrantSets;
