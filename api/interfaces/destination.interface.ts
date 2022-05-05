export interface DestinationResponse {
  destinations: Destination[];
}

export interface Destination {
  lat: number;
  lon: number;
  country: string;
  city: string;
  street: string;
  streetNumber: string;
  type: string;
  createdAt: string;
}
