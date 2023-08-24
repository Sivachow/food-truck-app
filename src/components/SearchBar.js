import React, { useState } from "react";
import debounce from "lodash/debounce";

/**
 * A component that provides a search input and button for filtering data.
 * 
 * @param {function} onSearch - Callback function to handle search action.
 * @returns {JSX.Element} - Rendered search bar component.
 */
function SearchBar({ onSearch }) {
  // State variable to track the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce the search callback with a delay of 300ms
  const debouncedSearch = debounce(onSearch, 300);

  // Function to trigger the search callback
  const handleSearch = () => {
    debouncedSearch(searchTerm);
  };

  return (
    <div className="search-container">
      {/* Input for entering search term */}
      <input
        className="search-input"
        type="text"
        placeholder="Search Food Items or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Button to initiate search */}
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
}

export default SearchBar;
