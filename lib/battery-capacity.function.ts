const FALLBACK_CAPACITY = 40;

export enum VehicleModel {
  Modeli394 = 'i3 94',
  Modeli3s94 = 'i3s 94',
  Modeli3120 = 'i3 120',
  Modeli3s120 = 'i3s 120',
  X1xDrive25e = 'X1 xDrive25e',
  X2xDrive25e = 'X2 xDrive25e',
  X3xDrive30e = 'X3 xDrive30e',
  X5xDrive40eiPerformance = 'X5 xDrive40e iPerformance',
  X5xDrive45e = 'X5 xDrive45e',
  Model225xeiPerformance = '225xe iPerformance',
  Model330e = '330e',
  Model330exDrive = '330e xDrive',
  Model330eiPerformance = '330e iPerformance',
  Model530eiPerformance = '530e iPerformance',
  Model740LeXDriveIPerformance = '740Le xDrive iPerformance',
  ModeliX3 = 'iX3'
}

const VehicleModelCapacity: Record<VehicleModel, number> = {
  [VehicleModel.Modeli394]: 27.2,  // 33 kWh of which 27.2 kWh can be effectively used https://en.wikipedia.org/wiki/BMW_i3
  [VehicleModel.Modeli3s94]: 27.2,  // 33 kWh of which 27.2 kWh can be effectively used https://en.wikipedia.org/wiki/BMW_i3
  [VehicleModel.Modeli3120]: 37.9, // 42.2 kWh lithium ion (37.9 kWh usable) https://ev-database.uk/car/1145/BMW-i3-120-Ah
  [VehicleModel.Modeli3s120]: 37.9, // 42.2 kWh lithium ion (37.9 kWh usable) https://ev-database.uk/car/1145/BMW-i3-120-Ah
  [VehicleModel.X1xDrive25e]: 9.7, // 9.7 kWh lithium ion https://hevcars.com.ua/wp-content/uploads/2019/09/bmw-x1-xdrive25e-phev-spec-hevcars.jpg
  [VehicleModel.X2xDrive25e]: 10, // 10 kWh lithium ion https://www.slashgear.com/2021-bmw-x2-xdrive25e-crossover-is-a-small-phev-with-big-ambitions-27622416/
  [VehicleModel.X3xDrive30e]: 10.8, // 12 kWh battery (10.8 kWh usable) https://insideevs.com/news/431133/2020-bmw-x3-xdrive30e-range-specs-price/
  [VehicleModel.X5xDrive40eiPerformance]: 9, // 9 kWh battery https://www.ultimatespecs.com/car-specs/BMW/71912/BMW-F15-X5-xDrive40e-iPerformance.html
  [VehicleModel.X5xDrive45e]: 21, // 24 kWh lithium ion (21 kWh usable) https://hevcars.com.ua/wp-content/uploads/2019/08/bmw-x5-xdrive45e-spec-hevcars.jpg
  [VehicleModel.Model225xeiPerformance]: 7.7, // 7.7 kWh lithium ion https://hevcars.com.ua/bmw/225xe-active-tourer-phev/
  [VehicleModel.Model330e]: 10.79, // 10.79 kWh lithium ion https://www.auto-data.net/en/bmw-3-series-sedan-g20-330e-292hp-plug-in-hybrid-steptronic-37654
  [VehicleModel.Model330exDrive]: 10.4, // 10.4 kWh lithium ion https://www.ultimatespecs.com/car-specs/BMW/119556/BMW-G20-3-Series-330e-xDrive.html
  [VehicleModel.Model330eiPerformance]: 11, // 12 kWh battery (11 kWh usable) https://pod-point.com/guides/vehicles/bmw/2019/330e
  [VehicleModel.Model530eiPerformance]: 9.2, // 9.2 kWh lithium ion https://hevcars.com.ua/bmw/530e-iperformance-phev/
  [VehicleModel.Model740LeXDriveIPerformance]: 7.4, //9.2 kWh lithium ion (7.4 kWh usable) https://www.press.bmwgroup.com/global/article/detail/T0261925EN/the-new-bmw-740e-iperformance-the-new-bmw-740le-iperformance-the-new-bmw-740le-xdrive-iperformance?language=en
  [VehicleModel.ModeliX3]: 74, // 80 kWh lithium ion (74 kWh usable) https://ev-database.uk/car/1136/BMW-iX3
};

export const getBatteryCapacity = (model: VehicleModel) => {
  if (Object.values(VehicleModel).includes(model)) {
    return VehicleModelCapacity[model];
  }
  return FALLBACK_CAPACITY;
};
