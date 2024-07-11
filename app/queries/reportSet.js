import axios from "axios";

const reportSet = async ({ setId, winnerId, entrantScore, opponentScore }) => {
  const response = await axios.post(
    "https://api.smash.gg/gql/alpha",
    {
      query: `
        mutation reportSet($setId: ID!, $winnerId: ID!) {
          reportBracketSet(setId: $setId, winnerId: $winnerId) {
            id
            state
          }
        }
      `,
      variables: {
        setId,
        winnerId,
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

export default reportSet;
