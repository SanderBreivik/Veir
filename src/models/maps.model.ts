export interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

export interface Bounds {
  northeast: Location;
  southwest: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Geometry {
  bounds: Bounds;
  location: Location;
  location_type: string;
  viewport: Viewport;
}

export interface Result {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
}

export interface PlusCode {
  compound_code: string;
  global_code: string;
}

export interface AddressLookupResponse {
  plus_code: PlusCode;
  results: Result[];
  status: string;
}
