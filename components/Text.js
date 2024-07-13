import React from "react";

export const Title = ({ children }) => (
  <h1 className="text-3xl mb-4 text-white">{children}</h1>
);

export const Description = ({ children }) => (
  <p className="mt-2 mb-4 text-slate-300">{children}</p>
);
