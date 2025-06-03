import React from "react";

const Search = ({ value, onChange }) => {
  return (
    <div className="ui search">
      <input
        className="prompt"
        type="text"
        placeholder="Buscar por nombre..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
