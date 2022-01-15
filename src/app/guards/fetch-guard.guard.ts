import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment,  } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadWeatherService } from '../services/load-weather.service';

@Injectable({
  providedIn: 'root'
})
export class FetchGuardGuard implements CanLoad {
  constructor(
    private loadWeather: LoadWeatherService,
    private router : Router
    ) {}

canLoad(
  route: Route,
  segments: UrlSegment[]
): Observable<boolean> | Promise<boolean> | boolean{
  if (!this.loadWeather.getWeatherFetched()){
    this.router.navigateByUrl('/');
  }
  return this.loadWeather.getWeatherFetched();
}

}
