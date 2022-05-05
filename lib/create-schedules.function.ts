import { ChargingSchedules, ChargingMode, ChargingProfile } from '../api';

export function createSchedules(
  chargingProfile: ChargingProfile,
  mode: ChargingMode,
  startTime = '02:00',
  endTime = '07:00',
  departureTime?: string,
  climatization?: boolean
): ChargingProfile {

  // if user doesn't have charging profile we will create one
  let newChargingProfile: ChargingProfile;
  if (chargingProfile && (chargingProfile.weeklyPlanner || chargingProfile.twoTimesTimer)) {
    newChargingProfile = chargingProfile;
  } else {
    newChargingProfile = {
      weeklyPlanner: {
        climatizationEnabled: climatization || false,
        chargingMode: mode,
        chargingPreferences: 'CHARGING_WINDOW',
        timer1: {},
        timer2: {},
        timer3: {},
        overrideTimer: {},
        preferredChargingWindow: {
          startTime,
          endTime,
          enabled: false
        }
      }
    };
  }

  const schedules: ChargingSchedules = <ChargingSchedules>(newChargingProfile.weeklyPlanner || newChargingProfile.twoTimesTimer);
  schedules.chargingMode = mode;
  if (schedules.timer1) {
    schedules.timer1.timerEnabled = false;
  } else {
    schedules.timer1 = {};
  }
  if (schedules.timer2) {
    schedules.timer2.timerEnabled = false;
  } else {
    schedules.timer2 = {};
  }
  if (schedules.timer3) {
    schedules.timer3.timerEnabled = false;
  } else if (newChargingProfile.weeklyPlanner){
    schedules.timer3 = {};
  }
  if (schedules.overrideTimer) {
    schedules.overrideTimer.timerEnabled = false;
  } else {
    schedules.overrideTimer = {};
  }
  if (schedules.preferredChargingWindow) {
    schedules.preferredChargingWindow.enabled = false;
  } else {
    schedules.preferredChargingWindow = {
      startTime,
      endTime,
      enabled: false
    };
  }

  if (mode === ChargingMode.DELAYED) {
    schedules.timer1 = {
      departureTime: departureTime || '07:30',
      timerEnabled: true
    };
    if (newChargingProfile.weeklyPlanner) {
      schedules.timer1.weekdays = [];
    }
    if (newChargingProfile.twoTimesTimer) {
      schedules.preferredChargingWindow = {
        startTime,
        endTime
      };
    }
  }

  return newChargingProfile;
}
