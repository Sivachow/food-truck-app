import React, { useEffect, useState, useMemo } from "react";
import "./FoodTruckList.css";
import debounce from "lodash/debounce";
import ErrorMessage from "./ErrorMessage";
import LoadingIndicator from "./LoadingIndicator";
import SearchBar from "./SearchBar";
import FoodTruckItem from "./FoodTruckItem";
import calculateDistance from "../utils/calculateDistance";
import navigation from "../utils/navigation";

// API URL for food truck data
const apiUrl = `https://data.sfgov.org/resource/rqzj-sfat.json`;

/**
 * Displays a list of food trucks based on user location and search input.
 * Fetches food truck data from an external API and updates the list accordingly.
 */
function FoodTruckList() {
  // State variables
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user location using the navigation utility function on initial render
  useEffect(() => {
    navigation(setUserLatitude, setUserLongitude);
  }, []);

  // Debounced function to fetch and filter food trucks
  const debouncedFetchFilteredFoodTrucks = useMemo(
    () =>
      debounce(
        async (
          searchTerm,
          userLatitude,
          userLongitude,
          setFoodTrucks,
          setLoading,
          setError
        ) => {
          try {
            setLoading(true);
            // Encode search term for URL and API query
            const encodedSearchTerm = encodeURIComponent(
              searchTerm.toLowerCase().trim().replace(/'/g, "''")
            );
            // Construct API query URL
            const queryUrl = `${apiUrl}?$where=(LOWER(fooditems)%20LIKE%20%27%25${encodedSearchTerm}%25%27%20OR%20LOWER(Applicant)%20LIKE%20%27%25${encodedSearchTerm}%25%27)%20AND%20status%20=%20%27APPROVED%27&$limit=50`;
            const response = await fetch(queryUrl);
            const data = await response.json();

            // Calculate distance for each food truck based on user location
            const foodTrucksWithDistance = data.map((truck) => ({
              ...truck,
              distance: calculateDistance(
                userLatitude,
                userLongitude,
                parseFloat(truck.latitude),
                parseFloat(truck.longitude)
              ),
            }));

            // Sort food trucks by distance
            const sortedFoodTrucks = foodTrucksWithDistance.sort(
              (a, b) => a.distance - b.distance
            );

            // Update state with sorted food trucks
            setFoodTrucks(sortedFoodTrucks);
            setLoading(false);
          } catch (error) {
            setError("An error occurred while fetching data.");
            setLoading(false);
          }
        },
        300
      ),
    []
  );

  // Fetch and update food truck data when user location or search term changes
  useEffect(() => {
    if (userLatitude && userLongitude) {
      debouncedFetchFilteredFoodTrucks(
        searchTerm,
        userLatitude,
        userLongitude,
        setFoodTrucks,
        setLoading,
        setError
      );
    }
  }, [
    searchTerm,
    userLatitude,
    userLongitude,
    debouncedFetchFilteredFoodTrucks,
  ]);

  // Component rendering
  return (
    <div className="container">
      {/* Search bar for user to enter search terms */}
      <SearchBar onSearch={setSearchTerm} />
      
      {/* Loading indicator while fetching data */}
      {loading && <LoadingIndicator />}
      
      {/* Display error message if fetching data fails */}
      {error && <ErrorMessage error={error} />}
      
      {/* Display food trucks in a grid */}
      <div className="grid-container">
        {foodTrucks.map((truck) => (
          <FoodTruckItem key={truck.objectid} truck={truck} />
        ))}
      </div>
    </div>
  );
}

export default FoodTruckList;
