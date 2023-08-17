import React from "react";
import { TextField } from "@mui/material";

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
