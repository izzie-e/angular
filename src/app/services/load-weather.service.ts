import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, tap, Observable, of, from} from 'rxjs';
import { HourlyData } from '../interfaces/HourlyData';


@Injectable({
  providedIn: 'root'
})
export class LoadWeatherService {
  private weather$!: Observable<HourlyData []>;
  private sunrise!: number;
  private sunset!: number;
  private weatherFetched = false;
  public hoursArry: number[] = []

  constructor(private http: HttpClient) { }

  public setWeatherFetched(bool: boolean){
    this.weatherFetched = bool;
  }

  public getWeatherFetched(){
    return this.weatherFetched;
  }

  //needs coords
  public getWeather(coords: number []): Observable<HourlyData []>{
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[1]}&lon=${coords[0]}&exclude=current,minutely,alerts&appid=889db4cd2682f3f9047e5bfe087fc6d4&units=metric`;

    return this.http
    .get<any>(url)
    .pipe(
      tap(data => {
        this.sunrise = data.daily[0].sunrise;
        this.sunset = data.daily[0].sunset;
      }), //get sunrise and sunset and store
      map(data => data.hourly),
      tap(data => this.weather$ = of(data)), //used in view details
    )
  }

  public getLoadedWeather(){
    return this.weather$;
  }

  public getSunriseSunset(){
    return [this.sunrise, this.sunset];
  }

}
