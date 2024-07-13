"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { fetchSets } from "utils/api";

const getOptions = (eventId, entrantId) => ({
  queryKey: [
    "entrantSets",
    { eventId: String(eventId), entrantId: String(entrantId) },
  ],
  queryFn: () => fetchSets(eventId, entrantId),
  enabled: !!eventId && !!entrantId,
});

const Entrant = ({ entrant }) => {
  const router = useRouter();
  const { eventId } = useParams();
  const queryClient = useQueryClient();

  const handleEntrantClick = () => {
    router.push(`/events/${eventId}/entrants/${entrant.id}`);
  };

  return (
    <li
      className={`p-2 mb-2 rounded-md cursor-pointer border ${getColorByPlacement(
        entrant.placement
      )}`}
      onClick={handleEntrantClick}
      onMouseEnter={() => {
        queryClient.prefetchQuery(getOptions(eventId, entrant.id));
      }}
    >
      {entrant.placement}. {entrant.name} (Seed {entrant.seed})
    </li>
  );
};

const getColorByPlacement = (placement) => {
  if (placement === 1) return "bg-emerald-950 border-emerald-700";
  if (placement === 2) return "bg-teal-950 border-teal-700";
  if (placement === 3) return "bg-cyan-950 border-cyan-700";
  if (placement === 4) return "bg-indigo-950 border-indigo-700";
  if (placement === 5) return "bg-violet-950 border-violet-700";
  if (placement === 7) return "bg-purple-950 border-purple-700";
  if (placement >= 9 && placement <= 16)
    return "bg-fuchsia-950 border-fuchsia-700";
  if (placement >= 17 && placement <= 32) return "bg-rose-950 border-rose-700";
  return "bg-slate-950 border-slate-700";
};

export default Entrant;
