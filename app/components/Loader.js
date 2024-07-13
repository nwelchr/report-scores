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
    <l-waveform size="80" stroke="3" speed="1.5" color="white"></l-waveform>
  );
};

export default Loader;
