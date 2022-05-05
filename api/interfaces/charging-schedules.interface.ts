import { Weekday } from '../enums';

export enum ChargingMode {
  IMMEDIATE = 'IMMEDIATE_CHARGING',
  DELAYED = 'DELAYED_CHARGING'
}

export interface Schedule {
  departureTime?: string;  // HH:mm
  timerEnabled?: boolean;
  weekdays?: Weekday[];
}

export interface ChargingProfile {
  weeklyPlanner?: ChargingSchedules;
  twoTimesTimer?: ChargingSchedules;
}

export interface ChargingSchedules {
  climatizationEnabled: boolean;
  chargingMode: ChargingMode;
  chargingPreferences: string;
  timer1: Schedule;
  timer2: Schedule;
  timer3?: Schedule;
  overrideTimer?: Schedule;
  preferredChargingWindow: {
    startTime: string;  // HH:mm
    endTime: string;    // HH:mm
    enabled?: boolean;
  }
}

export enum ChargingAction {
  Start = "START",
  Stop = "STOP"
}
