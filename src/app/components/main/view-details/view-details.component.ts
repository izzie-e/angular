import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HourlyData } from 'src/app/interfaces/HourlyData';
import { LoadWeatherService } from 'src/app/services/load-weather.service';
import { SaveHoursService } from 'src/app/services/save-hours.service';

@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.scss']
})
export class ViewDetailsComponent implements OnInit {
  private weatherSubscription!: Subscription;
  hour: any;
  weather$! : Observable<HourlyData []>;
  valid = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadWeather: LoadWeatherService,
    private saveHours: SaveHoursService
    ) { }

  ngOnInit(): void {
    this.hour = this.route.snapshot.params['id'];
  //  this.loadWeather.getLoadedWeather().subscribe( data=> console.log(data[0]))
  this.weather$ = this.loadWeather.getLoadedWeather();
  }

  saveHour(){
    this.weatherSubscription = this.weather$.subscribe( weather=> {
      this.saveHours.showHours().forEach(hour => {
        //ensure that duplicate hours aren't added
        if (JSON.stringify(hour) === JSON.stringify(weather[this.hour])){
          this.valid = false;
          alert("Already Added");
          this.router.navigateByUrl('/');
        }
      })
      if (this.valid){
        this.saveHours.addHour(weather[this.hour]);
        this.router.navigateByUrl('/saved');
      }
    })
  }
  // ngOnDestroy(){
  //   this.weatherSubscription.unsubscribe();
  // }

  goBack(){
    this.router.navigateByUrl('/');
  }

}
