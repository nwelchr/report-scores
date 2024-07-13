import React from "react";
import Header from "./Header";

const PageWrapper = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Header />
      <main
        className="w-full h-screen max-w-md p-6 rounded-md text-center flex flex-col justify-center relative"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 40%)",
        }}
      >
        {children}
      </main>
    </div>
  );
};

export default PageWrapper;
