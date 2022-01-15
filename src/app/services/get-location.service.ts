import { Injectable } from '@angular/core';
import { LoadWeatherService } from './load-weather.service';
import {of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {

  constructor() { }

  getUserLocation(): Promise<any>
  {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(response => {
          resolve([response.coords.longitude, response.coords.latitude]);
        },
        err => {
          reject(err);
        });
    });

  }

}
