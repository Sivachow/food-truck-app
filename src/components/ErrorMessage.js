import React from "react";

/**
 * A component that displays an error message.
 * 
 * @param {string} error - The error message to be displayed.
 * @returns {JSX.Element} - Rendered error message component.
 */
function ErrorMessage({ error }) {
  return <p className="error-text">{error}</p>;
}

export default ErrorMessage;
