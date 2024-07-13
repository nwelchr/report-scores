import React, { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    async function getLoader() {
      const { waveform } = await import("ldrs");
      waveform.register();
    }
    getLoader();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <l-waveform size="80" stroke="3" speed="1.5" color="white"></l-waveform>
    </div>
  );
};

export default Loader;
