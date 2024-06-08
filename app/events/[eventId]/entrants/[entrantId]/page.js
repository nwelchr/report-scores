"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const fetchEntrantSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}`
  );
  return data;
};

export default function EntrantSetsPage() {
  const { eventId, entrantId } = useParams();
  const router = useRouter();

  const { data, error, isLoading } = useQuery({
    queryKey: ["entrantSets", { eventId, entrantId }],
    queryFn: () => fetchEntrantSets(eventId, entrantId),
    enabled: !!eventId && !!entrantId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleClick = (opponentId) => {
    router.push(`/events/${eventId}/entrants/${opponentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl mb-8">Entrant Sets</h1>
      <h2 className="text-2xl mb-4">{data.entrant.name}</h2>
      <ul className="space-y-8">
        {data.entrant.paginatedSets.nodes.map((set) => {
          const [winnerPart, loserPart] = set.displayScore.split(" - ");
          const winnerScore = winnerPart.split(" ").pop();
          const winner = winnerPart.slice(0, winnerPart.lastIndexOf(" "));
          const loserScore = loserPart.split(" ").pop();
          const loser = loserPart.slice(0, loserPart.lastIndexOf(" "));

          const entrantName = data.entrant.name;
          const opponent = set.slots.find(
            (slot) => slot.entrant.id !== parseInt(entrantId)
          ).entrant;
          const isWinner = set.winnerId === parseInt(entrantId);

          const entrantScore = isWinner ? winnerScore : loserScore;
          const opponentScore = isWinner ? loserScore : winnerScore;

          return (
            <li
              key={set.id}
              className="flex items-center justify-center space-x-4"
            >
              <div
                className={`p-4 w-64 text-center rounded-md cursor-pointer border-2 ${
                  isWinner
                    ? "border-emerald-600 bg-emerald-950"
                    : "border-rose-600 bg-rose-950"
                }`}
              >
                <p>{entrantName}</p>
              </div>
              <p className="text-xl">vs.</p>
              <div
                onClick={() => handleClick(opponent.id)}
                className={`p-4 w-64 text-center rounded-md cursor-pointer border-2 hover:opacity-80 ${
                  !isWinner
                    ? "border-emerald-600 bg-emerald-950"
                    : "border-rose-600 bg-rose-950"
                }`}
              >
                <p>{opponent.name}</p>
              </div>
              <p className="text-2xl">
                {entrantScore}-{opponentScore}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
