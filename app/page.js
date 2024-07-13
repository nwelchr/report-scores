"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

const fetchEvent = async (slug) => {
  const { data } = await axios.get(`/api/events`, { params: { slug } });
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

export default function Page() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["event", { slug: extractSlug(url) }],
    queryFn: () => fetchEvent(extractSlug(url), router),
    enabled: !!extractSlug(url),
  });

  useEffect(() => {
    if (isSuccess && data) {
      router.push(`/events/${data.event.id}`);
    }
  }, [isSuccess, data, router]);

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-4xl mb-8">Fetch Event Data</h1>
      <form className="mb-8" onSubmit={(e) => e.preventDefault()}>
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
        </div>
      )}
    </div>
  );
}
