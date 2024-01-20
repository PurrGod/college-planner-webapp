import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search for UCSC Majors..." />
      <button>Search</button>
    </div>
  );
};

export default Search;
