export interface MapboxResponse {
  type: string;
  query: number[];
  features: Feature[];
  attribution: string;
}

export interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text_nb: string;
  place_name_nb: string;
  text: string;
  place_name: string;
  bbox: number[];
  center: number[];
  geometry: Geometry;
  context: Context[];
}

export interface Properties {
  mapbox_id: string;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Context {
  id: string;
  mapbox_id: string;
  wikidata: string;
  short_code: string;
  text_nb: string;
  language_nb: string;
  text: string;
  language: string;
}
