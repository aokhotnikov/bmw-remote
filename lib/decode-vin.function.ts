import { VehicleModel } from './battery-capacity.function';

export function decodeVin(vin: string): { model: VehicleModel; year: number } {

  let year, model;
  const vinCode = vin.toUpperCase();
  
  switch (vinCode.substring(4, 5)) {  // https://carinfo.kiev.ua/vin/bmw/4_7_digits?b=I01N
    case 'P':
      model = VehicleModel.Modeli3120;
      break;
    case 'Z':
      model = VehicleModel.Modeli394;
      break;
    default:
      model = VehicleModel.ModeliX3;
  }

  switch (vinCode.charAt(9)) {
    case 'C':
      year = 2012;
      break;
    case 'D':
      year = 2013;
      break;
    case 'E':
      year = 2014;
      break;
    case 'F':
      year = 2015;
      break;
    case 'G':
      year = 2016;
      break;
    case 'H':
      year = 2017;
      break;
    case 'J':
      year = 2018;
      break;
    case 'K':
      year = 2019;
      break;
    case 'L':
      year = 2020;
      break;
    case 'M':
      year = 2021;
      break;
    case 'N':
      year = 2022;
      break;
    case 'P':
      year = 2023;
      break;
    case 'R':
      year = 2024;
      break;
    default:
      year = 2025;
  }

  return { model, year };
}
