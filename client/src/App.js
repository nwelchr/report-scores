// src/App.js
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchEvent = async (slug) => {
  const { data } = await axios.get(`/api/event`, { params: { slug } });
  return data;
};

function App() {
  const [slug, setSlug] = useState("");
  const { data, error, isLoading } = useQuery({
    queryKey: ["event", { slug }],
    queryFn: () => fetchEvent(slug),
    enabled: !!slug,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="App">
      <h1>Fetch Event Data</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
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
