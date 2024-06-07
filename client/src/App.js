import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEvent = async (slug) => {
  const { data } = await axios.get(`/api/event`, { params: { slug } });
  return data;
};

const extractSlug = (input) => {
  const regex = /(tournament\/[^\/]+\/events?\/[^\/\s]+)/;
  const match = input.match(regex);
  if (match) {
    const normalizedSlug = match[0].replace("/events/", "/event/");
    return normalizedSlug;
  }
  return "";
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
  return "bg-gray-900";
};

function App() {
  const [url, setUrl] = useState("");
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["event", { slug: extractSlug(url) }],
    queryFn: () => fetchEvent(extractSlug(url)),
    enabled: !!extractSlug(url),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl mb-8">Fetch Event Data</h1>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter event slug or URL"
          className="p-2 rounded-md bg-violet-950 text-white w-full mb-4"
        />
      </form>
      {isLoading && <p className="text-xl">Loading...</p>}
      {error && <p className="text-xl text-red-500">Error: {error.message}</p>}
      {data && (
        <div>
          <h2 className="text-2xl mb-4">{data.event.name}</h2>
          <p className="mb-4">ID: {data.event.id}</p>
          <h3 className="text-xl mb-2">Standings</h3>
          <ul>
            {data.standings.map((standing) => (
              <li
                key={standing.entrant.id}
                className={`p-2 mb-2 rounded-md ${getColorByPlacement(
                  standing.placement
                )}`}
              >
                {standing.placement}. {standing.entrant.name} (Seed{" "}
                {standing.entrant.seeds[0].seedNum})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
