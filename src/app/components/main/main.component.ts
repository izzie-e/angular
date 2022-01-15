import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { HourlyData } from 'src/app/interfaces/HourlyData';
import { GetLocationService } from 'src/app/services/get-location.service';
import { LoadWeatherService } from 'src/app/services/load-weather.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public weather$!: Observable<HourlyData []>;
  public weather!: HourlyData[];

  public sunArray!: number [];
  public hoursToMidnight!: number;

  public loading = true;

  private weatherSubscription! : Subscription;

  constructor(private getLoc: GetLocationService, private loadWeather: LoadWeatherService ) { }

  ngOnInit(): void {
    this.hoursToMidnight = 25 - new Date().getHours();
    if(this.loadWeather.getWeatherFetched()){
      this.weather$ = this.loadWeather.getLoadedWeather();
      this.sunArray = this.loadWeather.getSunriseSunset();
      this.loading = false;
    } else {
      this.loadData();
    }
  }

  async loadData(){
    this.getLoc.getUserLocation()
    .then((coords)=>{
      this.weather$ = this.loadWeather.getWeather(coords);
      this.weatherSubscription = this.loadWeather.getWeather(coords).subscribe(
        (weather) => {
          // console.log(weather)
        },
        (err) => new Error(err),
        () => {
          this.sunArray = this.loadWeather.getSunriseSunset();
          this.loading = false;
          this.loadWeather.setWeatherFetched(true);
        }
      )
    })
  }

  giveColor(weather: string, time: number): string{
    if (weather === 'Rain'){
      return 'rainClass';
    } else {
      const [sunrise, sunset] = this.sunArray;
      if (time >= sunrise && time <= sunset) { //this should work as long as you filter so it ends at midnight
        return 'clearClass';
      }
    }
    return 'darkClass';
  }
  ngOnDestroy(){
    if(this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }

}
