"use client";

import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import SelectEntrant from "./SelectEntrant";
import { useReportContext } from "context/ReportContext";
import { fetchEntrants, fetchSets } from "utils/api";
import PageWrapper from "components/PageWrapper";

const SelectEntrantPage = () => {
  const { state, updateState } = useReportContext();
  // const router = useRouter();
  const { eventId } = router.query;

  const { data: entrants } = useQuery(["entrants", eventId], () =>
    fetchEntrants(eventId)
  );

  const handleEntrantSelect = async (entrant) => {
    updateState({ selectedEntrant: entrant, value: entrant.name });
    const sets = await fetchSets(eventId, entrant.id);
    const filteredSets = sets.filter(
      (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
    );
    updateState({ sets, filteredSets });

    // if (filteredSets.length === 1) {
    //   router.push(`/events/${eventId}/report/opponent-confirmation`);
    // } else {
    //   router.push(`/events/${eventId}/report/opponent-selection`);
    // }
  };

  return (
    <PageWrapper>
      <SelectEntrant onSelect={handleEntrantSelect} entrants={entrants} />
    </PageWrapper>
  );
};

export default SelectEntrantPage;
