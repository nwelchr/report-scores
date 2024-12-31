"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import SelectEntrant from "./SelectEntrant";
import { useReportContext } from "context/ReportContext";
import { fetchEntrants, fetchSets } from "utils/api";
import ProtectedRoute from "components/ProtectedRoute";

const SelectEntrantPage = () => {
  const { setReportState } = useReportContext();
  const router = useRouter();
  const { eventId } = useParams();

  const { data: entrants } = useQuery({
    queryKey: ["entrants", eventId],
    queryFn: () => fetchEntrants(eventId),
  });

  const handleEntrantSelect = async (entrant) => {
    const { sets } = await fetchSets(eventId, entrant.id);
    const filteredSets = sets.filter(
      (set) => set.state === "IN_PROGRESS" || set.state === "NOT_STARTED",
    );
    setReportState((prevState) => ({
      ...prevState,
      sets,
      filteredSets,
      selectedEntrant: entrant,
    }));

    if (filteredSets.length === 1) {
      router.push(`/events/${eventId}/report/opponent-confirmation`);
    } else {
      router.push(`/events/${eventId}/report/opponent-selection`);
    }
  };

  return <SelectEntrant onSelect={handleEntrantSelect} entrants={entrants} />;
};

export default ProtectedRoute(SelectEntrantPage, []);
