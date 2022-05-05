import { ServiceType } from '../enums';
import { ChargingProfile } from './charging-schedules.interface';

export interface Payload {
  authToken: string;
  vin: string;
}

export interface PayloadCommand extends Payload {
  serviceType: ServiceType;
  data?: ChargingProfile;
}
