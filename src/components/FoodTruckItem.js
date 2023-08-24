import React from "react";

/**
 * A component that displays information about a food truck.
 * 
 * @param {object} truck - The food truck data to be displayed.
 * @param {string} truck.image_url - URL of the food truck's image.
 * @param {string} truck.applicant - Name of the food truck.
 * @param {string} truck.fooditems - List of food items served by the truck.
 * @param {number} truck.distance - Distance of the truck from user's location (in meters).
 * @returns {JSX.Element} - Rendered food truck item component.
 */
function FoodTruckItem({ truck }) {
  return (
    <div className="grid-item">
      <div className="styled-card">
        {/* Display food truck image */}
        <div
          className="food-truck-image"
          style={{ backgroundImage: `url(${truck.image_url})` }}
        />
        
        {/* Display food truck name */}
        <h3 className="truck-name">{truck.applicant}</h3>
        
        {/* Display food items served by the truck */}
        <p className="food-items">{truck.fooditems}</p>
        
        {/* Display truck distance */}
        <p className="distance">Distance: {truck.distance} meters</p>
      </div>
    </div>
  );
}

export default FoodTruckItem;
