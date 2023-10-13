import { AddressLookupResponse } from "../models/maps.model";

export default class MapsService {
  static async getCityName(lat: number, long: number): Promise<string> {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${
        import.meta.env.VITE_MAPS_API_KEY
      }`
    );
    const data = (await response.json()) as AddressLookupResponse;
    console.log(data.results[0].address_components);

    const city = data.results[0].address_components.find(
      (component: any) =>
        component.types.includes("postal_town") ||
        component.types.includes("locality")
    );
    if (!city) throw new Error("Fant ikke by");
    return city.long_name;
  }
}
