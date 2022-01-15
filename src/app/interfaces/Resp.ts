import { HourlyData } from "./HourlyData";

export interface Resp {
  hourly: HourlyData;
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
}
