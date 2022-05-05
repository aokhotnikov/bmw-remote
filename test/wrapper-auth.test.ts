/**
 * Created by Andrey Okhotnikov
 * Email: hunterov1984@gmail.com
 */
import { assert } from 'chai';

import { WrapperBMW } from '../index';
import { ProblemKind } from '../lib';

describe('AUTH', function() {

  it('to check wrong credentials', async () => {
    const problem = {
      kind: ProblemKind.PermanentlyInvalidCredentials,
      title: 'email or password invalid',
      detail: 'Check the entered email or password'
  };
    const res = await WrapperBMW.authenticate('hunter@gmail.com', 'password');
    assert.isObject(res, 'response should be object');
    assert.hasAllKeys(res, ['kind', 'title', 'detail'], `object doesn't have all properties`);
    assert.deepEqual(res, problem, 'wrong answer');
  });

  it('to check token expired', async () => {
    const problem = {
      kind: ProblemKind.Unauthorized,
      title: '401 Unauthorized',
      detail: 'Request failed with status code 401'
    };
    const res = await WrapperBMW.getVehicles('rVHygmk1dZKVkGaeXiZPx8mWVpuwSTWx');
    assert.isObject(res, 'response should be object');
    assert.hasAllKeys(res, ['kind', 'title', 'detail'], `object doesn't have all properties`);
    assert.deepEqual(res, problem, 'wrong answer');
  });

  it('to check wrong token', async () => {
    const problem = {
      kind: ProblemKind.Unauthorized,
      title: '401 Unauthorized',
      detail: 'Request failed with status code 401'
    };
    const res = await WrapperBMW.getVehicles('abrakadabra');
    assert.isObject(res, 'response should be object');
    assert.hasAllKeys(res, ['kind', 'title', 'detail'], `object doesn't have all properties`);
    assert.deepEqual(res, problem, 'wrong answer');
  });

});
