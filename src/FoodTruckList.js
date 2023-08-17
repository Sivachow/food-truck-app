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

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

function FoodTruckList() {
  const [foodTrucks, setFoodTrucks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const apiUrl = `https://data.sfgov.org/resource/rqzj-sfat.json`;

    // Inside the fetchFilteredFoodTrucks function
    const fetchFilteredFoodTrucks = async () => {
      try {
        const response = await fetch(
          `${apiUrl}?$where=LOWER(fooditems)%20LIKE%20%27%25${searchTerm
            .toLowerCase()
            .trim()}%25%27%20AND%20status%20=%20%27APPROVED%27&$limit=50`
        );
        const data = await response.json();
        setFoodTrucks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFilteredFoodTrucks();
  }, [searchTerm]);

  return (
    <Container>
      <TextField
        label="Search Food Items"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Grid container spacing={3}>
        {foodTrucks.map((truck) => (
          <Grid item xs={12} sm={6} md={4} key={truck.objectid}>
            <StyledCard>
              <CardContent>
                <Typography variant="h6" component="div">
                  {truck.applicant}
                </Typography>
                <Typography color="text.secondary">
                  {truck.fooditems}
                </Typography>
              </CardContent>
              {/* Additional details can be added here */}
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FoodTruckList;
