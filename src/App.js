import React, { useEffect, useState } from "react";

function App() {
  const [userLatitude, setUserLatitude] = useState(null);
  const [userLongitude, setUserLongitude] = useState(null);

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

  return (
    <div className="App">
      <h1>Latitude: {userLatitude}</h1>
      <h1>Longitude: {userLongitude}</h1>
    </div>
  );
}

export default App;
