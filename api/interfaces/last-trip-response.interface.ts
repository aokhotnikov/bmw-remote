export interface LastTripResponse {
  lastTrip:{
    efficiencyValue: number;
    totalDistance: number;
    electricDistance: number;
    avgElectricConsumption: number;
    avgRecuperation: number;
    drivingModeValue: number;
    accelerationValue: number;
    anticipationValue: number;
    totalConsumptionValue: number;
    auxiliaryConsumptionValue: number;
    avgCombinedConsumption: number;
    electricDistanceRatio: number;
    savedFuel: number;
    date: string;
    duration: number;
  }
}
