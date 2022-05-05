import { assert } from 'chai';

import { getBatteryCapacity, VehicleModel } from '../lib';

describe('Battery Capacity Tests', function() {

  it('to check desired value', () => {
    const capacity = getBatteryCapacity(VehicleModel.Modeli3120);
    assert.isNumber(capacity, 'Value is not number');
    assert.equal(capacity, 37.9, 'Model i3 120 has wrong capacity');
  });

  it('to check default value', () => {
    const capacity = getBatteryCapacity('BMW i4' as any);
    assert.isNumber(capacity, 'Default value is not number');
    assert(capacity > 0, 'Default value must be greater than zero');
  });

});
