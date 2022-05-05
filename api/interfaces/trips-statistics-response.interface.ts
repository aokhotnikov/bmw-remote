export interface TripsStatisticsResponse {
  allTrips: {
    avgElectricConsumption: {
      communityLow: number;
      communityHigh: number;
      communityAverage: number;
      userAverage: number;
    };
    avgRecuperation: {
      communityLow: number;
      communityHigh: number;
      communityAverage: number;
      userAverage: number;
    };
    chargecycleRange: {
      communityHigh: number;
      communityAverage: number;
      userAverage: number;
      userHigh: number;
      userCurrentChargeCycle: number;
    };
    totalElectricDistance: {
      communityLow: number;
      communityHigh: number;
      communityAverage: number;
      userTotal: number;
    };
    avgCombinedConsumption: {
      communityLow: number;
      communityHigh: number;
      communityAverage: number;
      userAverage: number;
    };
    savedCO2: number;
    savedCO2greenEnergy: number;
    totalSavedFuel: number;
    resetDate: string;
    batterySizeMax: number;
  }
}
