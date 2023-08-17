import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const FoodTruckImage = styled("div")({
  height: "120px",
  width: "100%",
  backgroundSize: "cover",
  borderRadius: "8px",
});
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c * 1000; // Distance in meters
  return distance;
}

function FoodTruckList() {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
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

        setFoodTrucks(sortedFoodTrucks);
        setLoading(false);
      } catch (error) {
        setError("An error occurred while fetching data.");
        setLoading(false);
      }
    };

    fetchFilteredFoodTrucks();
  }, [searchTerm]);

  return (
    <Container>
      <TextField
        label="Search Food Items or Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      <Grid container spacing={3}>
        {foodTrucks.map((truck) => (
          <Grid item xs={12} sm={6} md={4} key={truck.objectid}>
            <StyledCard>
              <CardContent>
                <FoodTruckImage
                  style={{ backgroundImage: `url(${truck.image_url})` }}
                />
                <Typography variant="h6" component="div">
                  {truck.applicant}
                </Typography>
                <Typography color="text.secondary">
                  {truck.fooditems}
                </Typography>
                <Typography color="text.secondary">
                  Distance:{" "}
                  {truck.distance}{" "}
                  meters
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FoodTruckList;
