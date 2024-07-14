import React, { createContext, useContext, useState, useCallback } from "react";

const ReportContext = createContext();

export const useReportContext = () => useContext(ReportContext);

export const ReportProvider = ({ children }) => {
  const [reportState, _setReportState] = useState({
    selectedEntrant: null,
    selectedSet: null,
    filteredSets: [],
    gameData: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  const setReportState = useCallback((newState, callback) => {
    _setReportState((prevState) => {
      const updatedState =
        typeof newState === "function" ? newState(prevState) : newState;
      if (callback) {
        callback();
      }
      return updatedState;
    });
  }, []);

  const value = {
    reportState,
    setReportState,
    isLoading,
    setIsLoading,
  };

  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};
