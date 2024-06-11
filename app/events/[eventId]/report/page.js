"use client";

import React, { useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const fetchEntrants = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}/entrants`);
  return data.entrants;
};

const fetchSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}`
  );
  return data.sets;
};

const reportSet = async ({ setId, winnerId, score }) => {
  console.log(
    `Reporting set ${setId} with winner ${winnerId} and score ${score}`
  );
};

export default function ReportPage() {
  const [tag, setTag] = useState("");
  const [selectedEntrant, setSelectedEntrant] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [score, setScore] = useState("");
  const { eventId } = useParams();

  const { data: entrants, error: entrantsError } = useQuery({
    queryKey: ["entrants", { eventId }],
    queryFn: () => fetchEntrants(eventId),
  });

  const { data: sets, error: setsError } = useQuery({
    queryKey: ["entrants", selectedEntrant?.id],
    queryFn: () => fetchSets(eventId, selectedEntrant?.id),
    enabled: !!selectedEntrant,
  });

  const { mutate } = useMutation({
    mutationFn: reportSet,
    onSuccess: () => {
      console.log("Set reported successfully");
    },
  });

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleEntrantSelect = (entrant) => {
    setSelectedEntrant(entrant);
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
  };

  const handleSubmit = () => {
    if (selectedSet && score) {
      const winnerId = selectedEntrant.id;
      const setId = selectedSet.id;
      // mutation.mutate({ setId, winnerId, score });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl mb-8">Report Set</h1>
      <input
        type="text"
        value={tag}
        onChange={handleTagChange}
        placeholder="Enter your tag"
        className="p-2 rounded-md bg-violet-950 text-white w-full mb-4"
      />
      <ul className="space-y-4 mb-8">
        {entrants &&
          entrants
            .filter((entrant) =>
              entrant.name.toLowerCase().includes(tag.toLowerCase())
            )
            .map((entrant) => (
              <li
                key={entrant.id}
                className="p-2 rounded-md bg-gray-700 cursor-pointer"
                onClick={() => handleEntrantSelect(entrant)}
              >
                {entrant.name}
              </li>
            ))}
      </ul>
      {selectedEntrant && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl mb-4">Select Your Set</h2>
          <ul className="space-y-4">
            {sets &&
              sets.map((set) => (
                <li
                  key={set.id}
                  className="p-2 rounded-md bg-gray-700 cursor-pointer"
                  onClick={() => handleSetSelect(set)}
                >
                  {set.opponent.name}
                </li>
              ))}
          </ul>
        </div>
      )}
      {selectedSet && (
        <div className="mt-8">
          <h2 className="text-2xl mb-4">Enter the Score</h2>
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="Enter the score (e.g., 3-0)"
            className="p-2 rounded-md bg-violet-950 text-white mb-4"
          />
          <button
            onClick={handleSubmit}
            className="p-2 rounded-md bg-emerald-600 text-white"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
