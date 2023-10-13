import { MapboxResponse } from "../models/maps.model";

export default class MapsService {
  static async getCityName(lat: number, long: number): Promise<string> {
    const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

    if (!MAPBOX_TOKEN) {
      throw new Error("Mapbox token is not set.");
    }

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${MAPBOX_TOKEN}&types=place&language=nb`
    );

    const data = (await response.json()) as MapboxResponse;

    const place =
      data.features.find((feature: any) => feature.place_type.includes("place"))
        ?.text ?? "Ukjent sted";
    return place;
  }
}
