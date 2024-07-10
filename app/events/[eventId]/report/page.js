"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
} from "./utils";
import SelectEntrant from "./steps/SelectEntrant";
import OpponentConfirmation from "./steps/OpponentConfirmation";
import OpponentSelection from "./steps/OpponentSelection";
import ScoreInput from "./steps/ScoreInput";
import SubmissionConfirmation from "./steps/SubmissionConfirmation";

const fetchEntrants = async (eventId) => {
  const { data } = await axios.get(`/api/events/${eventId}/entrants`);
  return data;
};

const fetchSets = async (eventId, entrantId) => {
  const { data } = await axios.get(
    `/api/events/${eventId}/entrants/${entrantId}/sets`
  );
  return data.sets;
};

const reportSet = async ({
  eventId,
  setId,
  winnerId,
  entrantScore,
  opponentScore,
}) => {
  const response = await axios.post(`/api/events/${eventId}/report`, {
    setId,
    winnerId,
    entrantScore,
    opponentScore,
  });
  return response.data;
};

export default function ReportPage() {
  const { eventId } = useParams();
  const [step, setStep] = useState(1);
  const [selectedEntrant, setSelectedEntrant] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [filteredSets, setFilteredSets] = useState([]);
  const [entrantScore, setEntrantScore] = useState(null);
  const [opponentScore, setOpponentScore] = useState(null);
  const [value, setValue] = useState("");

  const { data: entrants } = useQuery({
    queryKey: ["entrants", eventId],
    queryFn: () => fetchEntrants(eventId),
  });

  const { data: sets } = useQuery({
    queryKey: ["sets", selectedEntrant?.id],
    queryFn: () => fetchSets(eventId, selectedEntrant?.id),
    enabled: !!selectedEntrant?.id,
  });

  const { mutate } = useMutation({
    mutationFn: reportSet,
    onSuccess: () => {
      console.log("Set reported successfully");
      removeFromLocalStorage("reportState");
      setStep(5);
    },
  });

  useEffect(() => {
    const savedState = getFromLocalStorage("reportState");
    if (savedState) {
      setStep(savedState.step);
      setSelectedEntrant(savedState.selectedEntrant);
      setSelectedSet(savedState.selectedSet);
      setEntrantScore(savedState.entrantScore);
      setOpponentScore(savedState.opponentScore);
      setValue(savedState.value);
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage("reportState", {
      step,
      selectedEntrant,
      selectedSet,
      filteredSets,
      entrantScore,
      opponentScore,
      value,
    });
  }, [
    step,
    selectedEntrant,
    selectedSet,
    filteredSets,
    entrantScore,
    opponentScore,
    value,
  ]);

  useEffect(() => {
    if (sets && sets.length) {
      const inProgressOrNotStarted = sets.filter(
        (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
      );
      setFilteredSets(inProgressOrNotStarted);
      if (inProgressOrNotStarted.length > 1) {
        console.warn("More than one set in progress for this user.");
      }
      if (inProgressOrNotStarted.length === 1) {
        setStep(2);
      } else {
        setStep(3);
      }
    }
  }, [sets]);

  const handleEntrantSelect = (suggestion) => {
    setSelectedEntrant(suggestion);
    setValue(suggestion.name);
    setStep(2);
  };

  const handleSetSelect = (set) => {
    setSelectedSet(set);
    setStep(4);
  };

  const handleSubmit = () => {
    if (selectedSet && entrantScore !== null && opponentScore !== null) {
      const winnerId =
        entrantScore > opponentScore
          ? selectedEntrant.id
          : selectedSet.opponent.id;
      const setId = selectedSet.id;
      mutate({ eventId, setId, winnerId, entrantScore, opponentScore });
    }
  };

  const handleBack = () => {
    if (step === 4 && filteredSets.length === 1) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SelectEntrant
            value={value}
            entrants={entrants}
            onChange={setValue}
            onSelect={handleEntrantSelect}
          />
        );
      case 2:
        return (
          <OpponentConfirmation
            filteredSets={filteredSets}
            onSelect={handleSetSelect}
            onNo={() => setStep(3)}
          />
        );
      case 3:
        return (
          <OpponentSelection
            sets={sets}
            onSelect={handleSetSelect}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <ScoreInput
            selectedEntrant={selectedEntrant}
            selectedSet={selectedSet}
            entrantScore={entrantScore}
            setEntrantScore={setEntrantScore}
            opponentScore={opponentScore}
            setOpponentScore={setOpponentScore}
            onSubmit={handleSubmit}
            onBack={handleBack}
          />
        );
      case 5:
        return <SubmissionConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col justify-center items-center">
      {renderStep()}
    </div>
  );
}
