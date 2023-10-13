export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: [number, number, number];
}

export interface Properties {
  meta: Meta;
  timeseries: Timeseries[];
}

export interface Meta {
  updated_at: string;
  units: Units;
}

export interface Units {
  air_pressure_at_sea_level: string;
  air_temperature: string;
  cloud_area_fraction: string;
  precipitation_amount: string;
  relative_humidity: string;
  wind_from_direction: string;
  wind_speed: string;
}

export interface Timeseries {
  time: string;
  data: Data;
}

export interface Data {
  instant: Instant;
  next_12_hours: Summary;
  next_1_hours: NextHours;
  next_6_hours: NextHours;
}

export interface Instant {
  details: Details;
}

export interface Details {
  air_pressure_at_sea_level: number;
  air_temperature: number;
  cloud_area_fraction: number;
  relative_humidity: number;
  wind_from_direction: number;
  wind_speed: number;
  precipitation_amount?: number; // Optional since it's not present in 'instant'
}

export interface Summary {
  summary: {
    symbol_code: string;
  };
}

export interface NextHours {
  summary: Summary;
  details: Details;
}
