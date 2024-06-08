"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Entrant from "@/app/components/Entrant";

const fetchEventDetails = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}`, {
    params: { eventId },
  });
  return data;
};

export default function EventPage() {
  const { eventId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["eventDetails", { eventId }],
    queryFn: () => fetchEventDetails(eventId),
    enabled: !!eventId,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {isLoading && <p className="text-xl">Loading...</p>}
      {error && <p className="text-xl text-red-500">Error: {error.message}</p>}
      {data && (
        <div>
          <h2 className="text-2xl mb-4">{data.event.name}</h2>
          <p className="mb-4">ID: {data.event.id}</p>
          <h3 className="text-xl mb-2">Standings</h3>
          <ul>
            {data.event.standings.nodes.map((standing) => (
              <Entrant
                key={standing.entrant.id}
                entrant={{
                  placement: standing.placement,
                  ...standing.entrant,
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
