import React, { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const useReport = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [reportState, setReportState] = useState({
    selectedEntrant: null,
    selectedSet: null,
    filteredSets: [],
    gameData: [],
  });

  const value = {
    reportState,
    setReportState,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};
