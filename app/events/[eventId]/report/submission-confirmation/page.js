"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import SubmissionConfirmation from "./SubmissionConfirmation";
import ProtectedRoute from "components/ProtectedRoute";

const SubmissionConfirmationPage = () => {
  const router = useRouter();
  const { eventId } = useParams();

  useEffect(() => {
    const timerId = setTimeout(() => {
      router.push(`/events/${eventId}/report/select-entrant`);
    }, 2000);

    return () => clearTimeout(timerId);
  });
  return <SubmissionConfirmation />;
};

export default ProtectedRoute(SubmissionConfirmationPage, [
  "selectedEntrant",
  "sets",
  "filteredSets",
  "selectedSet",
  "gameData",
]);
