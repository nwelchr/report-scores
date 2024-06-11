"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Entrant from "@/app/components/Entrant";

const fetchEntrants = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}/entrants`);
  return data;
};

export default function EventPage() {
  const { eventId } = useParams();

  const {
    data: entrants,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["eventDetails", { eventId }],
    queryFn: () => fetchEntrants(eventId),
    enabled: !!eventId,
  });

  console.log({ entrants });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {isLoading && <p className="text-xl">Loading...</p>}
      {error && <p className="text-xl text-red-500">Error: {error.message}</p>}
      {entrants && (
        <div>
          {/* <h2 className="text-2xl mb-4">{data.event.name}</h2>
          <p className="mb-4">ID: {data.event.id}</p> */}
          <h3 className="text-xl mb-2">Standings</h3>
          <ul>
            {entrants.map((entrant) => (
              <Entrant key={entrant.id} entrant={entrant} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
