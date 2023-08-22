import React from "react";
import { TextField } from "@mui/material";

/**
 * Renders a search input field for food items or names.
 *
 * @component
 * @param {string} searchTerm - The current search term.
 * @param {function} onSearchTermChange - Callback function to handle search term changes.
 * @returns {JSX.Element} - A search input field.
 * @example
 * return <SearchBar searchTerm={searchTerm} onSearchTermChange={handleSearchTermChange} />;
 */
function SearchBar({ searchTerm, onSearchTermChange }) {
  return (
    <TextField
      label="Search Food Items or Name"
      value={searchTerm}
      onChange={(e) => onSearchTermChange(e.target.value)}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
}

export default SearchBar;
