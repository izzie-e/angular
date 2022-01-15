import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HourlyData } from '../interfaces/HourlyData';

@Injectable({
  providedIn: 'root'
})
export class SaveHoursService {
  private savedHours: HourlyData []= [];
  private savedHours$!: Observable<HourlyData []>;

  constructor() { }

  public addHour(hour: HourlyData){
    //first make sure that saved hours contains hours from local storage
    if(window.localStorage.hasOwnProperty("savedHours")){
      const hours = window.localStorage.getItem("savedHours");
      if ( typeof(hours) ==='string'){
        this.savedHours = JSON.parse(hours);
      }
    }
    this.savedHours.push(hour);
    window.localStorage.setItem('savedHours', JSON.stringify(this.savedHours));
    this.savedHours$ = of(this.savedHours);
  }

  public showHours(){
    if(window.localStorage.hasOwnProperty("savedHours")){
      const hours = window.localStorage.getItem("savedHours");
      if ( typeof(hours) ==='string'){
        this.savedHours = JSON.parse(hours);
      }
    }
    return this.savedHours;
  };

  public returnObservable(){
    return this.savedHours$;
  }

  public clearHours(){
    this.savedHours = [];
    this.savedHours$ = of(this.savedHours);
    window.localStorage.clear();
  }

  public removeHour(hour: HourlyData){
    //first make sure that saved hours contains hours from local storage
    if(window.localStorage.hasOwnProperty("savedHours")){
      const hours = window.localStorage.getItem("savedHours");
      if ( typeof(hours) ==='string'){
        this.savedHours = JSON.parse(hours);
      }
    }
    const filtered = this.savedHours.filter(function(savedHour) {
       return (JSON.stringify(savedHour) !== JSON.stringify(hour));
      });

    this.savedHours = filtered;
    window.localStorage.setItem('savedHours', JSON.stringify(this.savedHours));
    this.savedHours$ = of(this.savedHours);
  }
}

