import React, { useState } from "react";
import Select from "react-select";
import "./Search.css";

const Search = ({ updateMajorClasses, setLoading }) => {
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
        setLoading(true);

        const apiEndpoint = `https://uscc-classes.osc-fr1.scalingo.io/api/majors/${selectedMajor.value}`;
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log(data);

        updateMajorClasses(data.requirements);
      } catch (error) {
        console.error("Error fetching major classes:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="search-bar">
      <div className="inp">
        <Select
          placeholder="Search for UCSC Majors..."
          options={majors}
          isSearchable
          value={selectedMajor}
          onChange={(selectedOption) => setSelectedMajor(selectedOption)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
