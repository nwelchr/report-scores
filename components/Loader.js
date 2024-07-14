// components/Loader.js
import React from "react";
import { Puff, TailSpin } from "@agney/react-loading";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-opacity-75">
      <TailSpin width="100" color="white" />
      <p className="p-8 text-sm text-slate-300">Loading...</p>
    </div>
  );
};

export default Loader;
