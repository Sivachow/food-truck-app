import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: theme.spacing(), // Increase padding for more spacing
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  transition: "transform 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

function FoodTruck({ truck }) {
  return (
    <Grid item xs={12} sm={6} md={4} key={truck.objectid}>
      <StyledCard>
        <CardContent>
          <Typography variant="h6" component="div" style={{ color: "#1e88e5", marginBottom: "10px" }}>
            {truck.applicant}
          </Typography>
          <Typography color="text.primary" style={{ marginBottom: "15px" }}>
            {truck.fooditems}
          </Typography>
          <Typography color="text.secondary" style={{ marginBottom: "5px" }}>
            Address: {truck.address}
          </Typography>
          <Typography color="text.secondary">
            Distance: {truck.distance.toFixed(2)} meters
          </Typography>
        </CardContent>
      </StyledCard>
    </Grid>
  );
}

export default FoodTruck;
