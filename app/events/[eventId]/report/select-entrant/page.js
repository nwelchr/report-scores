"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SelectEntrant from "./SelectEntrant";
import { useReportContext } from "context/ReportContext";
import { fetchEntrants, fetchSets } from "utils/api";
import PageWrapper from "components/PageWrapper";

const SelectEntrantPage = () => {
  const { reportState, setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const { data: entrants } = useQuery({
    queryKey: ["entrants", eventId],
    queryFn: () => fetchEntrants(eventId),
  });

  const handleEntrantSelect = async (entrant) => {
    const sets = await fetchSets(eventId, entrant.id);
    const filteredSets = sets.filter(
      (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED"
    );
    setReportState((prevState) => ({
      ...prevState,
      sets,
      filteredSets,
      selectedEntrant: entrant,
    }));

    if (filteredSets.length === 1) {
      console.log("push onto router");
      router.push(`/events/${eventId}/report/opponent-confirmation`);
    } else {
      router.push(`/events/${eventId}/report/opponent-selection`);
    }
  };

  return (
    <PageWrapper>
      <SelectEntrant onSelect={handleEntrantSelect} entrants={entrants} />
    </PageWrapper>
  );
};

export default SelectEntrantPage;
