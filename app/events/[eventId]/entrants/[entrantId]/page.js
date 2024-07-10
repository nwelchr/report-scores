"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const getOptions = (eventId, entrantId) => ({
  queryKey: [
    "entrantSets",
    { eventId: String(eventId), entrantId: String(entrantId) },
  ],
  queryFn: () => fetchEntrantSets(eventId, entrantId),
  enabled: !!eventId && !!entrantId,
});

const fetchEntrantSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}/sets`
  );
  return data;
};

export default function EntrantSetsPage() {
  const { eventId, entrantId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(getOptions(eventId, entrantId));

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
        <p>Error: {error.message}</p>
      </div>
    );

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
          {data.sets.map((set) => {
            const entrantName = data.entrant.name;
            const opponent = set.opponent;
            const entrantScore =
              set.entrantScore !== null ? set.entrantScore : "-";
            const opponentScore =
              set.opponentScore !== null ? set.opponentScore : "-";

            let entrantClass = "";
            let opponentClass = "";
            if (set.state === "COMPLETE") {
              entrantClass =
                set.winnerId === parseInt(entrantId)
                  ? "border-emerald-700 bg-emerald-950"
                  : "border-rose-700 bg-rose-950";
              opponentClass =
                set.winnerId === parseInt(opponent.id)
                  ? "border-emerald-700 bg-emerald-950"
                  : "border-rose-700 bg-rose-950";
            } else {
              entrantClass =
                set.state === "IN_PROGRESS"
                  ? "border-violet-700 bg-violet-950"
                  : "border-gray-700 bg-gray-950";
              opponentClass = entrantClass;
            }

            return (
              <li key={set.id} className="grid grid-cols-4 gap-4 text-center">
                <div className="text-gray-500 flex justify-center items-center">
                  <span className="block text-gray-300">
                    {set.fullRoundText}
                  </span>
                </div>
                <div
                  className={`p-4 w-full text-center rounded-md cursor-pointer border-2 ${entrantClass}`}
                >
                  <p>{entrantName}</p>
                </div>
                <div
                  onMouseEnter={() => {
                    queryClient.prefetchQuery(getOptions(eventId, opponent.id));
                  }}
                  onClick={() => handleClick(opponent.id)}
                  className={`p-4 w-full text-center rounded-md cursor-pointer border-2 hover:opacity-80 ${opponentClass}`}
                >
                  <p>{opponent.name}</p>
                </div>
                <p className="text-2xl flex items-center justify-center">
                  {set.state === "COMPLETE"
                    ? `${entrantScore}-${opponentScore}`
                    : set.state === "IN_PROGRESS"
                    ? "In Progress"
                    : "Not Started"}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
