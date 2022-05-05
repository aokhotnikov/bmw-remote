export interface Car {
  vin: string;
  model: string;
  year: number;

  battery: {
    isPluggedIn: boolean;
    isCharging: boolean;
    level: number | null;
    limit: number | null;
    chargeRate: number | null;
    chargeTimeRemaining: number | null;
    batCapacity: number;
    range: number | null;
  },

  location: {
    lat: number | null;
    lng: number | null;
    updatedAt: string | null;
  },

  odometer: number;
  odometerUpdated: string;
}
