import { ChargingState, ConnectionStatus, DoorLockState, PositionStatus } from '../enums';

export interface VehicleStatusResponse {
  vehicleStatus: VehicleStatus;
}

export interface VehicleStatus {
  vin: string;
  mileage: number;  // in Km
  updateReason: string;
  updateTime: string;
  doorDriverFront: string;
  doorDriverRear: string;
  doorPassengerFront: string;
  doorPassengerRear: string;
  windowDriverFront: string;
  windowDriverRear: string;
  windowPassengerFront: string;
  windowPassengerRear: string;
  trunk: string;
  rearWindow: string;
  hood: string;
  doorLockState: DoorLockState;
  parkingLight: string;
  positionLight: string;
  remainingFuel: number;
  remainingRangeElectric: number;     // in Km
  remainingRangeElectricMls: number;  // in miles
  remainingRangeFuel: number;
  remainingRangeFuelMls: number;
  maxRangeElectric: number;      // in Km
  maxRangeElectricMls: number;   // in miles
  connectionStatus: ConnectionStatus;
  chargingStatus: ChargingState;
  chargingTimeRemaining?: number; // in minutes. This value is only available if car is actively charging otherwise it is not present in the response
  chargingLevelHv: number;
  lastChargingEndReason: string;
  lastChargingEndResult: string;
  position: {
    lat: number;
    lon: number;
    heading: number;        // in degrees
    status: PositionStatus; // "OK" if tracking is enabled and "DRIVER_DISABLED" if it is disabled in the vehicle
  };
  internalDataTimeUTC: string;
  singleImmediateCharging: boolean;
  chargingConnectionType: string;
  chargingInductivePositioning: string;
  vehicleCountry: string;
  checkControlMessages: [];
  cbsData: {[k:string]:string}[];
}
