import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import FoodTruck from "./FoodTruck";
import { calculateDistance } from "../utilities/utils";

/**
 * This component displays a list of food trucks based on user's location and search input.
 * It utilizes geolocation API to retrieve user's current location and fetches food truck data from an external API.
 *
 * @component
 * @example
 * return <FoodTruckList />;
 */
function FoodTruckList() {
  // State to store user's current location, food truck data, search term, loading status, and error status
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to get user's current location using geolocation API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  // Effect to fetch and update food truck data based on search term and user's location
  useEffect(() => {
    const apiUrl = `https://data.sfgov.org/resource/rqzj-sfat.json`;

    // Replace single quotes with double single quotes to prevent query issues
    const encodedSearchTerm = searchTerm.toLowerCase().trim().replace(/'/g, "''");

    // Function to fetch filtered food truck data
    const fetchFilteredFoodTrucks = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?$where=(LOWER(fooditems)%20LIKE%20%27%25${encodedSearchTerm
            .toLowerCase()
            .trim()}%25%27%20OR%20LOWER(Applicant)%20LIKE%20%27%25${encodedSearchTerm
            .toLowerCase()
            .trim()}%25%27)%20AND%20status%20=%20%27APPROVED%27&$limit=50`
        );

        const data = await response.json();

        // Calculate distance and sort food trucks by distance
        const foodTrucksWithDistance = data.map((truck) => ({
          ...truck,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(truck.latitude),
            parseFloat(truck.longitude)
          ),
        }));
        const sortedFoodTrucks = foodTrucksWithDistance.sort(
          (a, b) => a.distance - b.distance
        );

        setFoodTrucks(sortedFoodTrucks);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchFilteredFoodTrucks();
  }, [searchTerm, userLocation.latitude, userLocation.longitude]);

  // Render the component
  return (
    <Container>
      {/* Render the search bar */}
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

      {/* Display loading status */}
      {loading && <Typography>Loading...</Typography>}

      {/* Display error message if there's an error */}
      {error && <Typography color="error">{error}</Typography>}

      {/* Display the list of food trucks */}
      <Grid container spacing={3}>
        {foodTrucks.map((truck) => (
          <FoodTruck truck={truck} key={truck.objectid} />
        ))}
      </Grid>
    </Container>
  );
}

export default FoodTruckList;
