import { ChargingState, ConnectionStatus, DoorLockState, PositionStatus, Weekday } from '../enums';

export interface VehicleInfo {
  vin: string;
  bodyType: string;
  colorCode: string;
  color: string;
  steering: string;
  modelName: string;
  countryCodeISO: string;
  series: string;
  basicType: string;
  a4a: string;
  lscType: string;
  hasAlarmSystem: boolean;
  onlineSearchMode: string;
  statisticsCommunityEnabled: boolean;
  statisticsAvailable: boolean;
  hmiVersion: string;
  saList: string[];
  headUnit: string;
  telematicsUnit: string;
  brand: string;
  driveTrain: string;
  yearOfConstruction: number;
  puStep: string;
  iStep: string;
  capabilities: {
    ventilation: string;
    heating: string;
    cooling: string;
    lightFlash: string;
    honkHorn: string;
    climateTimer: string;
    remote360: string;
    carCloud: string;
    vehicleFinder: string;
    sendPoi: string;
    doorLock: string;
    doorUnlock: string;
    remoteSoftwareUpgrade: string;
    climateNow: string;
    remoteEngineStart: string;
    chargingControl: string;
    lastDestinations: string;
    ipa: string;
    chargeNow: string;
    smartSolution: string;
    rangeMap: string;
    smartAccessNfcCapable: boolean;
  };
  users: {
    usid: string;
    lastVerifiedMappedDate: string;
  }[];
  properties: {
    lastUpdateTime: string;
    lastLscUpdateTime: string;
    lastLscUpdateTrigger: string;
    mileageKm: number;
    vehicleInMotion: boolean
    lastTeleserviceUpdateTime: string;
    lights: {
      parkingLight: string;
      positionLight: string;
    };
    range: {
      remainingFuelLiters: number;
      maxRangeFuelKm: number;
      remainingRangeFuelKm: number;
      remainingRangeElectricKm: number;
      maxRangeElectricKm: number;
    };
    service: {
      maintenanceItems: any[];
      checkControlMessages: any[];
    };
    charging: {
      singleImmediateCharging: boolean;
      chargingStatus: ChargingState;
      connectionStatus: ConnectionStatus;
      lastChargingEndReason: string;
      lastChargingEndResult: string;
      chargingLevelHvPercent: number;
      chargingLevelLvPercent: number;
      chargingConnectionType: string;
      chargingTimeRemainingTimestamp: string; // ISOString format "2020-12-23T07:10:35Z"
      chargingTimeRemainingMinutes?: number;  // This value is only available if car is actively charging otherwise it is not present in the response
      profile: {
        departureTimes: {
          id: number;
          action: 'ACTIVATE' | 'DEACTIVATE',
          weekdays: Weekday[],
          hour: number;
          minute: number;
        }[];
        climatizationActive: boolean;
        mode: 'IMMEDIATE_CHARGING' | 'DELAYED_CHARGING';
        preference: string;
        timerType: string;
        chargeStateReductionTimer: {
          start: {
            hour: number;
            minute: number;
          };
          end: {
            hour: number;
            minute: number;
          };
        };
      };
      lscChargingStatus: string;
      chargingLevelTargetPercent: number;
    },
    climateControls: {
      timer: any[];
    };
    doors: {
      doorSecurityState: DoorLockState;
      hood: string;
      driverFront: string;
      driverRear: string;
      passengerFront: string;
      passengerRear: string;
      trunk: string;
    };
    windows: {
      driverFront: string;
      driverRear: string;
      passengerFront: string;
      passengerRear: string;
    },
    position: {
      latitude: number;
      longitude: number;
      heading: number;
      altitude: number;
      status: PositionStatus;
      lastUpdateTime: string; // ISOString
    }
  }
}
