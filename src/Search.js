// Search.js

import React, { useState } from "react";
import Select from "react-select";
import "./Search.css";

const Search = () => {
  const initialMajors = [
    "Computer Science",
    "Biology",
    "Psychology",
    "Environmental Studies",
    "Economics",
    "Mathematics",
    "History",
    "Art",
    "Physics",
    "Sociology",
  ];

  const formatOptions = (majors) => {
    return majors.map((major) => ({
      label: major,
      value: major,
    }));
  };

  const [majors, setMajors] = useState(formatOptions(initialMajors));
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleSearch = (selectedOption) => {
    setSelectedMajor(selectedOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Set width to 100%
    }),
  };

  return (
    <div  className="search-bar">
      <Select style={{width: '70%'}}
        placeholder="Search for UCSC Majors..."
        options={majors}
        isSearchable
        value={selectedMajor}
        onChange={handleSearch}
        styles={customStyles} // Apply custom styles
      />
      <button>Search</button>
    </div>
  );
};

export default Search;
