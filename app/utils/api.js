import axios from "axios";

export const fetchEntrants = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}/entrants`);
  return data;
};

export const fetchSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}/sets`
  );
  return data.sets;
};

export const reportSet = async ({ eventId, setId, winnerId, gameData }) => {
  const response = await axios.post(`/api/events/${eventId}/report`, {
    setId,
    winnerId,
    gameData,
  });
  return response.data;
};
