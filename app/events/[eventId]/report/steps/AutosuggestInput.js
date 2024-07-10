import React from "react";
import Autosuggest from "react-autosuggest";

export default function AutosuggestInput({
  value,
  onChange,
  onSelect,
  suggestions,
}) {
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    return inputLength === 0
      ? []
      : suggestions.filter(
          (suggestion) =>
            suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div className="p-2 rounded-md bg-gray-700 cursor-pointer">
      {suggestion.name}
    </div>
  );

  return (
    <Autosuggest
      suggestions={getSuggestions(value)}
      onSuggestionsFetchRequested={({ value }) => onChange(value)}
      onSuggestionsClearRequested={() => onChange("")}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        placeholder: "Enter your tag",
        value,
        size: 30,
        onChange: (e, { newValue }) => onChange(newValue),
        className:
          "p-2 rounded-md bg-violet-950 text-white w-full mb-4 text-2xl text-center",
      }}
      onSuggestionSelected={(e, { suggestion }) => onSelect(suggestion)}
    />
  );
}
