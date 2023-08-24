import React from "react";

/**
 * A component that displays a loading indicator.
 * 
 * @returns {JSX.Element} - Rendered loading indicator component.
 */
function LoadingIndicator() {
  return (
    <div className="loading-container">
      {/* Animated spinner */}
      <div className="loading-spinner"></div>
      
      {/* Text indicating loading */}
      <p>Loading...</p>
    </div>
  );
}

export default LoadingIndicator;
