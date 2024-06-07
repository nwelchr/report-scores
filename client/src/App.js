// src/App.js
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
    <div className="App">
      <h1>Fetch Event Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter event slug"
        />
        <button type="submit">Fetch Event</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>{data.name}</h2>
          <p>ID: {data.id}</p>
        </div>
      )}
    </div>
  );
}

export default App;
