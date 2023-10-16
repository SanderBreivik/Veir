import { Feature } from "../models/yr.model";

export default class YrService {
  static async getYrWeatherData(lat: string, long: string): Promise<Feature> {
    console.log("Fetching weather data", lat, long);

    return new Promise<Feature>((resolve, reject) => {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open(
          "GET",
          `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`
        );
        xhr.setRequestHeader("User-Agent", "veir");

        xhr.onload = function () {
          if (xhr.status === 200) {
            console.log("Data:", JSON.parse(xhr.responseText));
            resolve(JSON.parse(xhr.responseText) as Feature);
          } else {
            console.error("Request failed. Returned status:", xhr.status);
            reject(new Error("Request failed. Returned status: " + xhr.status));
          }
        };

        xhr.onerror = function () {
          console.error("Network error.");
          reject(new Error("Network error."));
        };

        xhr.send();
      } catch (error: any) {
        console.error(error);
        console.error(error.message);
        reject(new Error("Could not fetch weather data"));
      }
    });
  }
}
