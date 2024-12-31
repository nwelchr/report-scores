import React, { useState } from "react";

const AutocompleteInput = ({ onSelect, suggestions }) => {
  const [query, setQuery] = useState("");

  const filteredSuggestions = suggestions.filter((suggestion) => {
    return suggestion.name.toLowerCase().includes(query.toLowerCase());
  });

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.name);
    onSelect(suggestion);
  };

  return (
    <div className="relative">
      <input
        className="p-2 border rounded-md bg-slate-900 border-slate-700 text-white w-full mb-4 text-4xl text-center"
        value={query}
        onChange={handleChange}
      />
      {query && filteredSuggestions.length > 0 && (
        <ul className="absolute mt-1 w-full z-10 max-h-32 overflow-y-auto">
          {filteredSuggestions.map((suggestion) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className="text-3xl cursor-pointer select-none p-2 rounded-md bg-slate-950 border border-slate-700 text-center text-white hover:bg-slate-900"
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteInput;
