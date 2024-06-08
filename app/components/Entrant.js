"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const fetchEntrantSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}`
  );
  return data;
};

const getOptions = (eventId, entrantId) => ({
  queryKey: [
    "entrantSets",
    { eventId: String(eventId), entrantId: String(entrantId) },
  ],
  queryFn: () => fetchEntrantSets(eventId, entrantId),
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
      className={`p-2 mb-2 rounded-md cursor-pointer ${getColorByPlacement(
        entrant.placement
      )}`}
      onClick={handleEntrantClick}
      onMouseEnter={() => {
        queryClient.prefetchQuery(getOptions(eventId, entrant.id));
      }}
    >
      {entrant.placement}. {entrant.name} (Seed {entrant.seeds[0].seedNum})
    </li>
  );
};

const getColorByPlacement = (placement) => {
  if (placement === 1) return "bg-emerald-600";
  if (placement === 2) return "bg-teal-600";
  if (placement === 3) return "bg-cyan-600";
  if (placement === 4) return "bg-indigo-600";
  if (placement === 5) return "bg-violet-600";
  if (placement === 7) return "bg-rose-600";
  if (placement >= 9 && placement <= 16) return "bg-red-800";
  if (placement >= 17 && placement <= 32) return "bg-red-950";
  return "bg-gray-800";
};

export default Entrant;
