import React, { useEffect, useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import SearchBar from "./SearchBar";
import FoodTruck from "./FoodTruck";
import { calculateDistance } from "../utilities/utils"; // Import the calculateDistance function

function FoodTruckList() {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  useEffect(() => {
    const apiUrl = `https://data.sfgov.org/resource/rqzj-sfat.json`;

    const fetchFilteredFoodTrucks = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?$where=(LOWER(fooditems)%20LIKE%20%27%25${searchTerm
            .toLowerCase()
            .trim()}%25%27%20OR%20LOWER(Applicant)%20LIKE%20%27%25${searchTerm
            .toLowerCase()
            .trim()}%25%27)%20AND%20status%20=%20%27APPROVED%27&$limit=50`
        );
        const data = await response.json();
        const foodTrucksWithDistance = data.map((truck) => ({
          ...truck,
          distance: calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            parseFloat(truck.latitude),
            parseFloat(truck.longitude)
          ),
        }));

        // Sort food trucks by distance
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

  return (
    <Container>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {foodTrucks.map((truck) => (
          <FoodTruck truck={truck} key={truck.objectid} />
        ))}
      </Grid>
    </Container>
  );
}

export default FoodTruckList;
