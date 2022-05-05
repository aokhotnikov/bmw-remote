/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { assert } from 'chai';

import { Car, WrapperBMW } from '../index';

const LOGIN = '';
const PASS = '';

describe('METHODS', function() {
  let token: any, cars: any;

  it('authenticateWithPassword()', async () => {
    token = await WrapperBMW.authenticate(LOGIN, PASS);
    console.log(`Access Token = ${token}`);
    assert.isString(token, 'response should be string');
  });

  it('getVehicles()', async () => {
    cars = (await WrapperBMW.getVehicles(token) as Car[]);
    console.log(`Vehicles = ${JSON.stringify(cars)}`);
    assert.isArray(cars, 'response should be array');
    assert.operator(cars.length, '>', 0, 'array should not be empty');
  });
});
