/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { default as Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { URLSearchParams } from 'url';

import {
  AccessTokenResponse, LastTripResponse, VehicleStatusResponse, Payload, TripsStatisticsResponse, VehiclesResponse,
  PayloadCommand, ExecutionStatusResponse, DestinationResponse, VehicleInfo, ChargingProfile
} from '../interfaces';

/**
 * This is a Typescript class encapsulating the BMW API set
 */
export class ApiBMW {

  readonly baseURL = 'https://myc-profile.bmwgroup.com';
  readonly loginURL: {[k:string]: string} = {
    ios: 'https://customer.bmwgroup.com/gcdm/oauth/token',    //  The access token has a 1 hour expiration
    android: 'https://b2vapi.bmwgroup.com/webapi/oauth/token' //  The access token has a 8 hour expiration
  };
  readonly apiURL = this.baseURL + '/api/gateway/brs/webapi';

  // Remote API Key and Remote API Secret
  private credentials = {
    key: 'd766b537-a654-4cbd-a3dc-0ca5672d7f8d',
    secret: '15f697f6-a5d5-4cad-99d9-3a15bc7f3973'
  };
  readonly base64EncodedCredentials: string;

  request: AxiosInstance;

  constructor(options?: AxiosRequestConfig) {
    this.request = Axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      ...options
    });

    this.base64EncodedCredentials = Buffer
      .from(`${this.credentials.key}:${this.credentials.secret}`)
      .toString('base64');
  }

  /**
   * Perform the login and return the access token
   * @param {string} email
   * @param {string} password
   * @param {"android" | "ios"} app
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<AccessTokenResponse>>}
   */
  login(email: string, password: string, app = 'ios', options?: AxiosRequestConfig): Promise<AxiosResponse<AccessTokenResponse>> {

    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('username', email);
    params.append('password', password);

    const headers = this.getBasicAuthHeader();

    return this.request.post(this.loginURL[app], params.toString(), { headers, ...options });
  }

  /**
   * Exchange login token to access token for all subsequent actions
   * @param {string} accessToken
   * @param {string} refreshToken
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<AccessTokenResponse>>}
   */
  getAccessToken(accessToken: string, refreshToken: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AccessTokenResponse>> {

    const params = new URLSearchParams();
    params.append('grant_type', 'access_token');
    params.append('access_token', accessToken);
    params.append('refresh_token', refreshToken);
    params.append('token_type', 'gcdm');

    const headers = this.getBasicAuthHeader();

    return this.request.post('/v2/tokenlogin', params.toString(), { headers, ...options });
  }

  /**
   * Use the refresh_token from the Password Grant and obtain a new access token.
   * This will invalidate the previous access token.
   * @param {string} refresh_token
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<AccessTokenResponse>>}
   */
  refreshToken(refresh_token: string, options?: AxiosRequestConfig): Promise<AxiosResponse<AccessTokenResponse>> {

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token);

    return this.request.post('/v2/tokenrefresh', params.toString(), { ...options });
  }

  /**
   * Get all vehicles for the authenticated user
   * @param {Authorization} token - Bearer {access_token} from authentication
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<VehiclesResponse>>}
   */
  getVehicles(token: string, options?: AxiosRequestConfig): Promise<AxiosResponse<VehiclesResponse>> {
    const headers = this.getBearerTokenHeader(token);
    return this.request.get(`${this.apiURL}/v1/user/vehicles`, { headers, ...options });
  }

  /**
   * Get vehicle status
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<VehicleStatusResponse>>}
   */
  getVehicleStatus(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<VehicleStatusResponse>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${payload.vin}/status`, { headers, ...options });
  }

  /**
   * Get vehicle info
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<VehicleInfo>>}
   */
  getVehicleInfo(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<VehicleInfo>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.baseURL}/api/gateway/mg-vehicle/v1/vehicle/${payload.vin}`, { headers, ...options });
  }

  /**
   * Get the statistics for all trips taken in the vehicle
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<TripsStatisticsResponse>>}
   */
  getAllTripsStatistics(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<TripsStatisticsResponse>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${payload.vin}/statistics/allTrips`, { headers, ...options });
  }

  /**
   * Get the statistics about most recent trip
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<LastTripResponse>>}
   */
  getLastTripStatistics(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<LastTripResponse>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${payload.vin}/statistics/lastTrip`, { headers, ...options });
  }

  /**
   * Shows when the car is scheduled to charge
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<ChargingProfile>>}
   */
  getChargingTimes(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<ChargingProfile>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${payload.vin}/chargingprofile`, { headers, ...options });
  }

  /**
   * Get vehicle destinations
   * @param {Payload} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<DestinationResponse>>}
   */
  getDestinations(payload: Payload, options?: AxiosRequestConfig): Promise<AxiosResponse<DestinationResponse>> {
    const headers = this.getBearerTokenHeader(payload.authToken);
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${payload.vin}/destinations`, { headers, ...options });
  }

  /**
   * Get the status of a POSTed `sendCommand` request
   * @param {PayloadCommand} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<ExecutionStatusResponse>>}
   */
  getRequestStatus(payload: PayloadCommand, options?: AxiosRequestConfig): Promise<AxiosResponse<ExecutionStatusResponse>> {
    const { authToken, vin, serviceType } = payload;
    const headers = this.getBearerTokenHeader(authToken);
    const params = { serviceType };
    return this.request.get(`${this.apiURL}/v1/user/vehicles/${vin}/serviceExecutionStatus`, { headers, params, ...options });
  }

  /**
   * Instruct the car to perform an action
   * @param {PayloadCommand} payload
   * @param {AxiosRequestConfig} options
   * @return {Promise<AxiosResponse<ExecutionStatusResponse>>}
   */
  sendCommand(payload: PayloadCommand, options?: AxiosRequestConfig): Promise<AxiosResponse<ExecutionStatusResponse>> {
    const { authToken, vin, serviceType, data } = payload;
    const headers = this.getBearerTokenHeader(authToken);
    const params = new URLSearchParams();
    params.append('serviceType', serviceType);
    if (data) {
      params.append('data', JSON.stringify(data));
    }
    return this.request.post(`${this.apiURL}/v1/user/vehicles/${vin}/executeService`, params.toString(), { headers, ...options });
  }

  private getBearerTokenHeader(token: string): {[k:string]: string} {
    return { 
      Authorization: 'Bearer ' + token,
      'User-Agent': 'ConnectedROW/10.9.1 (iPhone; iOS 13.5; Scale/2.00)',
    };
  }

  private getBasicAuthHeader(): {[k:string]: string} {
    return { 
      'Authorization': 'Basic ' + this.base64EncodedCredentials,
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'User-Agent': 'ConnectedROW/10.9.1 (de.bmw.connected; build:2033; iOS 13.5.0) Alamofire/4.9.1'
    };
  }
}
