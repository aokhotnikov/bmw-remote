/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { AxiosError, AxiosResponse } from 'axios';

import {
  AccessTokenResponse, ApiBMW, VehicleSpecification, VehiclesResponse, ServiceType, ExecutionStatusResponse, Payload,
  ChargingProfile, ChargingMode, VehicleInfo, ChargingAction, Car
} from './api';
import {
  InvalidCredentialsError,
  BadRequestError,
  createSchedules,
  buildVehicleResponse,
  Problem,
  ProblemKind
} from './lib';

const Api = new ApiBMW();

export * from './api';

export const WrapperBMW = {

  authenticate: async (user: string, password: string): Promise<string | Problem> => {
    try {
      let res: AxiosResponse<AccessTokenResponse> = await Api.login(user, password);
      const { access_token, refresh_token } = res.data;
      res = await Api.getAccessToken(access_token, refresh_token);
      return res.data.access_token;
    }
    catch (e) {
      const error = e.response?.data?.error;
      if (['invalid_grant', 'invalid scope'].includes(error)) {
        return WrapperBMW.sendProblem(new InvalidCredentialsError('email or password'));
      }
      return WrapperBMW.sendProblem(e);
    }
  },

  getVehicles: async (authToken: string): Promise<Car[] | Problem> => {
    try {
      const res: AxiosResponse<VehiclesResponse> = await Api.getVehicles(authToken);
      const vins = res.data.vehicles.filter(v => v.driveTrain !== 'CONV').map((v: VehicleSpecification) => v.vin);
      const vehicles: Car[] = [];
      for (const vin of vins) {
        try {
          const resp: AxiosResponse<VehicleInfo> = await Api.getVehicleInfo({ authToken, vin });
          const response = buildVehicleResponse(resp.data);
          vehicles.push(response);
        } catch (err) {
          // failed response
        }
      }
      return vehicles;
    }
    catch (e) {
      return WrapperBMW.sendProblem(e);
    }
  },

  getVehicleByVin: async (authToken: string, vin: string): Promise<Car | Problem> => {
    try {
      const res: AxiosResponse<VehicleInfo> = await Api.getVehicleInfo({
        authToken,
        vin
      });
      if (res.data.driveTrain === 'CONV') {
        return WrapperBMW.sendProblem(new BadRequestError(`The vehicle is not an electric car and therefore has no charge state`));
      }

      return buildVehicleResponse(res.data);
    }
    catch (e) {
      return WrapperBMW.sendProblem(e);
    }
  },

  sendChargingAction: async (authToken: string, vin: string, action: ChargingAction): Promise<null | Problem> => {
    try {
      const payload: Payload = {
        authToken,
        vin
      };
      const res: AxiosResponse<ChargingProfile> = await Api.getChargingTimes(payload);
      if (action === ChargingAction.Stop) {
        return WrapperBMW.setScheduledStartTime(payload, res.data, '02:00');
      }
      if (action !== ChargingAction.Start) {
        return WrapperBMW.sendProblem(new BadRequestError('Wrong command'));
      }
      return WrapperBMW.deleteScheduledStartTime(payload, res.data);
    }
    catch (e) {
      return WrapperBMW.sendProblem(e);
    }
  },

  setScheduledStartTime: async (payload: Payload, chargingProfile: ChargingProfile, startTime: string): Promise<null | Problem> => {
    try {
      const isValidTime = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(startTime);
      if (!isValidTime) {
        return WrapperBMW.sendProblem(new BadRequestError('Wrong time format: startTime must be in "HH:mm" format'));
      }
      const data: ChargingProfile = createSchedules(chargingProfile, ChargingMode.DELAYED, startTime);
      const res: AxiosResponse<ExecutionStatusResponse> = await Api.sendCommand({
        ...payload,
        serviceType: ServiceType.CHARGING_CONTROL,
        data
      });

      return null;
    }
    catch (e) {
      return WrapperBMW.sendProblem(e);
    }
  },

  deleteScheduledStartTime: async (payload: Payload, chargingProfile: ChargingProfile): Promise<null | Problem> => {
    try {
      const data: ChargingProfile = createSchedules(chargingProfile, ChargingMode.IMMEDIATE);
      const res: AxiosResponse<ExecutionStatusResponse> = await Api.sendCommand({
        ...payload,
        serviceType: ServiceType.CHARGING_CONTROL,
        data
      });

      return null;
    }
    catch (e) {
      return WrapperBMW.sendProblem(e);
    }
  },

  sendProblem: (e: any): Problem => {

    const problem = {
      kind: e.kind || ProblemKind.ServerError,
      title: e.title || 'Internal Api Error',
      detail: e.detail || e.message || 'Unknown Error'
    };

    if (e.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      const { data, status, statusText } = (<AxiosError>e).response as AxiosResponse;
      const { error_description, error = {} } = data;
      const { code, description } = error;

      const msg = error_description || description || (typeof error === 'string' && error);

      if (msg) {
        problem.detail = [...msg.match(/[A-Za-z0-9-]+/g).reduce((set: Set<any>, el: any) => set.add(el), new Set())].join(' ');
      }
      problem.title = status + ' ' + statusText;
      switch (status) {
        case 400:
          problem.kind = ProblemKind.BadRequest;
          break;
        case 401:
          problem.kind = ProblemKind.Unauthorized;
          break;
        case 403:
          problem.kind = ProblemKind.Forbidden;
          break;
        case 404:
          problem.kind = ProblemKind.NotFound;
          break;
        case 408:
          problem.kind = ProblemKind.Timeout;
          break;
        default:
          problem.kind = ProblemKind.ServerError;
      }
    } else if (e.request) {
      // The request was made but no response was received
      problem.kind = ProblemKind.Timeout;
      problem.title = 'Gateway Timeout';
    }

    return problem;
  }
}
