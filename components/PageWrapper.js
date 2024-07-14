import React from "react";
import Header from "./Header";
import { useReportContext } from "context/ReportContext";
import Loader from "./Loader";

const PageWrapper = ({ children }) => {
  const { isLoading } = useReportContext();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      {isLoading && <Loader />}
      <main
        className={`w-full h-screen max-w-md p-6 rounded-md text-center flex flex-col justify-center relative ${
          isLoading ? "hidden" : ""
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(100,116,139,0.1) 0%, rgba(0,0,0,0) 90%)",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
