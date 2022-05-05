import { ExecutionStatus } from '../enums';

export interface ExecutionStatusResponse {
  executionStatus: {
    serviceType: string;
    status: ExecutionStatus;
    eventId: string;
    extendedStatus?: any;
  }
}
