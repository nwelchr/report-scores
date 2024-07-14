"use client";

import SubmissionConfirmation from "./SubmissionConfirmation";
import ProtectedRoute from "components/ProtectedRoute";

const SubmissionConfirmationPage = () => {
  return <SubmissionConfirmation />;
};

export default ProtectedRoute(SubmissionConfirmationPage, [
  "selectedEntrant",
  "sets",
  "filteredSets",
  "selectedSet",
  "gameData",
]);
