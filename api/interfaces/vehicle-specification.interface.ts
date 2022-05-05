export interface VehiclesResponse {
  vehicles: VehicleSpecification[]
}

export interface VehicleSpecification {
  vin: string;
  model: string;
  bodytype: string;
  driveTrain: 'BEV' | 'PHEV' | 'CONV' | 'BEV_REX'; // https://www.ucsusa.org/resources/comparing-electric-vehicles
  fuelType?: 'DIESEL' | 'PETROL';
  color: string;
  colorCode: string;
  brand: string;
  licensePlate?: string;
  yearOfConstruction: number;
  statisticsCommunityEnabled: boolean;
  statisticsAvailable: boolean;
  hub: string;
  hasAlarmSystem: boolean;
  dealer: {[k: string]: string};
  breakdownNumber: string;
  countryCode: string;
  egoVehiclePath?: string;
  chargingUpdateMode: string;
  steering: string;
  vehicleFinderRestriction: string;
  hmiVersion: string;
  a4a: string;
  vehicleFinder: string;
  remote360: string;
  hornBlow: string;
  lightFlash: string;
  doorLock: string;
  doorUnlock: string;
  climateControl: string;
  climateNow: string;
  climateNowRES: string;
  climateControlRES: string;
  chargingControl: string;
  chargeNow: string;
  sendPoi: string;
  rangeMap: string;
  lastDestinations: string;
  intermodalRouting: string;
  climateFunction: string;
  onlineSearchMode: string;
  onlineSearchProvider: string;
  smartSolution: string;
  carCloud: string;
  supportedChargingModes: string[];
  lscType: string;
  ipa: string;
  puStep: string;
  exFactoryPUStep: any;
  remoteSoftwareUpgrade: string;
}
