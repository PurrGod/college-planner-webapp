// Search.js

import React, { useState } from "react";
import Select from "react-select";
import "./Search.css";
import ClassesList from "./ClassesList"; // Import the ClassesList component

const Search = ({ updateMajorClasses }) => {
  const initialMajors = [
    "Computer Science: Computer Game Design B.S.",
    "Computer Engineering B.S.",
    "Art B.A.",
    "Psychology B.A.",
    "Technology and Information Management B.S.",
    "Film and Digital Media B.A.",
    "History of Art and Visual Culture B.A.",
    "Economics B.A.",
    "Environmental Studies B.A.",
    "Biomolecular Engineering and Bioinformatics B.S.",
  ];

  const formatOptions = (majors) => {
    return majors.map((major) => ({
      label: major,
      value: major,
    }));
  };

  const [majors] = useState(formatOptions(initialMajors));
  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleSearch = async () => {
    setSelectedMajor(selectedMajor);

    if (selectedMajor) {
      try {
        const apiEndpoint = `https://uscc-classes.osc-fr1.scalingo.io/api/majors/${selectedMajor.value}`;
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log(data);

        // Call the function to update majorClasses in Calendar.js
        updateMajorClasses(data);
      } catch (error) {
        console.error("Error fetching major classes:", error);
      }
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "100%", // Set width to 100%
    }),
  };

  return (
    <div className="search-bar">
      <Select
        style={{ width: "70%" }}
        placeholder="Search for UCSC Majors..."
        options={majors}
        isSearchable
        value={selectedMajor}
        onChange={(selectedOption) => setSelectedMajor(selectedOption)}
        styles={customStyles}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
