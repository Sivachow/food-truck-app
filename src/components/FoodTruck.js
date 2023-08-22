import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

/**
 * Renders a FoodTruck card component that displays details about a food truck.
 *
 * @component
 * @param {object} truck - The food truck object containing details to display.
 * @returns {JSX.Element} - A card displaying food truck information.
 * @example
 * return <FoodTruck truck={truckData} />;
 */
const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(2), // Increase padding for more spacing
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

/**
 * The FoodTruck component displays information about a specific food truck.
 *
 * @param {object} truck - The food truck object containing details to display.
 * @returns {JSX.Element} - The FoodTruck component.
 */
function FoodTruck({ truck }) {
  return (
    <Grid item xs={12} sm={6} md={4} key={truck.objectid}>
      {/* Styled card for the food truck */}
      <StyledCard>
        <CardContent>
          {/* Food truck applicant name */}
          <Typography
            variant="h6"
            component="div"
            style={{ color: "#1e88e5", marginBottom: "10px" }}
          >
            {truck.applicant}
          </Typography>

          {/* Food items served by the truck */}
          <Typography color="text.primary" style={{ marginBottom: "15px" }}>
            {truck.fooditems}
          </Typography>

          {/* Food truck address */}
          <Typography color="text.secondary" style={{ marginBottom: "5px" }}>
            Address: {truck.address}
          </Typography>

          {/* Distance from user's location */}
          <Typography color="text.secondary">
            Distance: {truck.distance.toFixed(2)} meters
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

export default FoodTruck;
