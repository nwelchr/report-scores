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
      <h2 className="text-4xl mb-4">{data.entrant.name}</h2>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-4 gap-4 text-center text-gray-500 font-extralight">
          <div className="col-span-1">Phase</div>
          <div className="col-span-1">Entrant</div>
          <div className="col-span-1">Opponent</div>
          <div className="col-span-1">Score</div>
        </div>
        <ul className="space-y-8 mt-4">
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
              <li key={set.id} className="grid grid-cols-4 gap-4 text-center">
                <div className="text-gray-500">
                  <span className="block text-sm">
                    {set.phaseGroup.phase.name}
                  </span>
                  <span className="block text-gray-300">
                    {set.fullRoundText}
                  </span>
                </div>
                <div
                  className={`p-4 w-full text-center rounded-md cursor-pointer border-2 ${
                    isWinner
                      ? "border-emerald-600 bg-emerald-950"
                      : "border-rose-600 bg-rose-950"
                  }`}
                >
                  <p>{entrantName}</p>
                </div>
                <div
                  onClick={() => handleClick(opponent.id)}
                  className={`p-4 w-full text-center rounded-md cursor-pointer border-2 hover:opacity-80 ${
                    !isWinner
                      ? "border-emerald-600 bg-emerald-950"
                      : "border-rose-600 bg-rose-950"
                  }`}
                >
                  <p>{opponent.name}</p>
                </div>
                <p className="text-2xl flex items-center justify-center">
                  {entrantScore}-{opponentScore}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
