# Veir

Veir is a Lit + TypeScript project that shows weather data from your current location using Yr's API.

[Deployed on Netlify](https://veir.netlify.app)

[![Netlify Status](https://api.netlify.com/api/v1/badges/4112ac71-c808-45e5-903b-6d2fbe07e9a2/deploy-status)](https://app.netlify.com/sites/veir/deploys)

## Getting Started

To get started with Veir, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies by running `npm install`.
3. Create a `.env` file in the root directory of the project.
4. Add the following line to the `.env` file: `VITE_MAPBOX_TOKEN=<your Mapbox token>`
5. Run code with `npm run dev`

<!-- The `.env` file is used to store environment variables for the project. In this case, we need to create a `VITE_MAPBOX_TOKEN` variable and assign it a value that is a token from Mapbox. This token is used to access the Mapbox API, which is used to display the map in the application. -->
