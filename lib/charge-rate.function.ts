/**
 * This function returns charge rate in kWh
 * @param {number} chargeTimeRemaining - estimated time in minutes until fully charged
 * @param {number} batteryLevel - current battery level in percents
 * @param {number} fullBatCapacity - full battery capacity in kWh
 * @param {number} chargeLimit - in percent
 * @return {number}
 */
export function getChargeRate(chargeTimeRemaining: number | undefined, batteryLevel: number, fullBatCapacity: number, chargeLimit = 100) {
  if (!chargeTimeRemaining) {
    return 0;
  }
  const percent = fullBatCapacity / 100; // kWh in 1%
  const capacityToCharge = chargeLimit - batteryLevel;  // in percents
  const capacityToChargeInKwh = capacityToCharge * percent;  // in kWh
  const chargeTimeRemainingInHours = chargeTimeRemaining / 60;  // in hours
  const chargeRateInKwh = capacityToChargeInKwh / chargeTimeRemainingInHours;
  return +(chargeRateInKwh).toFixed(3);
}
