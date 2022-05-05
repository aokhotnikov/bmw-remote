import { assert } from 'chai';

import { getChargeRate } from '../lib';

describe('Charge Rate Tests', function() {

  it('to check desired value', () => {
    const rate = getChargeRate(196, 59, 40);
    assert.isNumber(rate, 'Value is not number');
    assert.equal(rate, 5.02, 'wrong rate');
  });

  it('to check empty value', () => {
    const rate = getChargeRate(undefined, 55, 40, 90);
    assert.isNumber(rate, 'Default value is not number');
    assert(rate === 0, 'value must be zero');
  });

});
