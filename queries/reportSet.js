import axios from "axios";

const reportSet = async ({ setId, winnerId, gameData }) => {
  const response = await axios.post(
    "https://api.smash.gg/gql/alpha",
    {
      query: `
        mutation reportSet($setId: ID!, $winnerId: ID!, $gameData: [BracketSetGameDataInput]) {
          reportBracketSet(setId: $setId, winnerId: $winnerId, gameData: $gameData) {
            id
            state
          }
        }
      `,
      variables: {
        setId,
        winnerId,
        gameData,
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
