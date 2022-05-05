import { ChargingState, ConnectionStatus, Car, VehicleInfo } from '../api';
import { decodeVin, getChargeRate, getBatteryCapacity, VehicleModel } from './index';

export function buildVehicleResponse(state: VehicleInfo): Car {
  const { vin, modelName, properties } = state || {};
  const { mileageKm, charging, range, position, lastUpdateTime } = properties || {};

  const batCapacity = getBatteryCapacity(modelName as VehicleModel);
  const { connectionStatus, chargingStatus, chargingLevelHvPercent, chargingLevelTargetPercent, chargingTimeRemainingMinutes } = charging || {};
  const chargeRate = getChargeRate(chargingTimeRemainingMinutes, chargingLevelHvPercent, batCapacity, chargingLevelTargetPercent);

  const { model: vinModel, year } = decodeVin(vin);

  const { latitude, longitude, lastUpdateTime: locationUpdated } = position || {};

  return {
    vin,
    model: modelName || vinModel,
    year,

    battery: {
      isPluggedIn: connectionStatus === ConnectionStatus.CONNECTED,
      isCharging: chargingStatus === ChargingState.CHARGING,
      level: chargingLevelHvPercent || null,
      limit: chargingLevelTargetPercent || null,
      chargeRate: chargeRate || null,
      chargeTimeRemaining: chargingTimeRemainingMinutes || null,
      batCapacity,
      range: range?.remainingRangeElectricKm || null,
    },

    location: {
      lat: latitude || null,  // if Driver turn off position tracking(position.status === PositionStatus.OFF) we return NaN
      lng: longitude || null,// if Driver turn off position tracking(position.status === PositionStatus.OFF) we return NaN
      updatedAt: locationUpdated || null,
    },

    odometer: mileageKm,
    odometerUpdated: lastUpdateTime
  };
}
