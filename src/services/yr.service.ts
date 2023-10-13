import { Feature } from "../models/yr.model";

export default class YrService {
  static async getYrWeatherData(lat: string, long: string): Promise<Feature> {
    const response = await fetch(
      `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${lat}&lon=${long}`,
      {
        headers: {
          "User-Agent": "veir",
        },
      }
    );
    const data = await response.json();
    return data;
  }
}
