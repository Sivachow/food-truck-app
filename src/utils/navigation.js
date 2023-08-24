/**
 * Get the user's current latitude and longitude using the browser's geolocation API.
 *
 * @param {function} setUserLatitude - Callback function to set the user's latitude.
 * @param {function} setUserLongitude - Callback function to set the user's longitude.
 */
function navigation(setUserLatitude, setUserLongitude) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract and set the user's latitude and longitude from the position object
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      },
      (error) => {
        // Handle geolocation error
        console.error("Geolocation error:", error);
      }
    );
  }
  
  export default navigation;
  