/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSets } from "utils/api";

const getOptions = (eventId, entrantId) => ({
  queryKey: [
    "entrantSets",
    { eventId: String(eventId), entrantId: String(entrantId) },
  ],
  queryFn: () => fetchSets(eventId, entrantId),
  enabled: !!eventId && !!entrantId,
});

export default function EntrantSetsPage() {
  const { eventId, entrantId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery(getOptions(eventId, entrantId));

  if (isLoading)
    return (
      <div className="min-h-screen text-white p-8 flex flex-col items-center">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen text-white p-8 flex flex-col items-center">
        <p>Error: {error.message}</p>
      </div>
    );

  const handleClick = (opponentId) => {
    router.push(`/events/${eventId}/entrants/${opponentId}`);
  };

  console.log({ data });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 flex flex-col items-center">
      <h2 className="text-4xl mb-4">{data.entrant.name}</h2>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-4 gap-4 text-center text-slate-500 font-extralight">
          <div className="col-span-1">Phase</div>
          <div className="col-span-1">Entrant</div>
          <div className="col-span-1">Opponent</div>
          <div className="col-span-1">Score</div>
        </div>
        <ul className="gap-y-8 mt-4">
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
                  ? "border-teal-700 bg-teal-950"
                  : "border-fuchsia-700 bg-fuchsia-950";
              opponentClass =
                set.winnerId === parseInt(opponent.id)
                  ? "border-teal-700 bg-teal-950"
                  : "border-fuchsia-700 bg-fuchsia-950";
            } else {
              entrantClass =
                set.state === "IN_PROGRESS"
                  ? "border-violet-700 bg-violet-950"
                  : "border-slate-700 bg-slate-950";
              opponentClass = entrantClass;
            }

            return (
              <li key={set.id} className="grid grid-cols-4 gap-4 text-center">
                <div className="text-slate-500 flex justify-center items-center">
                  <span className="block text-slate-300">
                    {set.fullRoundText}
                  </span>
                </div>
                <div
                  className={`p-4 w-full text-center rounded-md cursor-pointer border ${entrantClass}`}
                >
                  <p>{entrantName}</p>
                </div>
                <div
                  onMouseEnter={() => {
                    queryClient.prefetchQuery(getOptions(eventId, opponent.id));
                  }}
                  onClick={() => handleClick(opponent.id)}
                  className={`p-4 w-full text-center rounded-md cursor-pointer border hover:opacity-80 ${opponentClass}`}
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
