# Food Truck Finder

Food Truck Finder is a web application that helps users find food trucks in their vicinity. It utilizes the San Francisco government's data on approved food trucks and calculates the distance between the user's location and each food truck. This project was developed as part of an assignment to demonstrate creating a production-ready application within a limited time budget.

## Features

- Display a list of approved food trucks based on the user's location.
- Sort food trucks by distance.
- Search for food items or food truck names.
- Interactive card design that scales on hover.

## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/your-username/food-truck-finder.git
   ```
2. Navigate to the project directory:
    ```bash
    cd food-truck-finder
    ```
3. Install dependencies ```bash npm install ```
### Usage
Use ```bash npm start``` this starts the react application in your local host : 3000 by default

### Technologies used
React: JavaScript library for building user interfaces.
Material-UI: React UI framework for creating visually appealing components.
Geolocation API: Used to retrieve the user's current location.
Fetch API: Used for making HTTP requests to the data source.
GitHub: Version control and code repository.

### Project Structure

The project is organized into several components:

FoodTruckList.js: The main component responsible for fetching data, handling user location, and displaying the list of food trucks.
FoodTruck.js: A component to display individual food truck information in a styled card.
SearchBar.js: A component providing a search bar for filtering food trucks.
utilities/utils.js: Contains the calculateDistance function to compute the distance between two geographical coordinates.
