import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HourlyData } from 'src/app/interfaces/HourlyData';
import { SaveHoursService } from 'src/app/services/save-hours.service';

@Component({
  selector: 'app-saved',
  templateUrl: './saved.component.html',
  styleUrls: ['./saved.component.scss']
})
export class SavedComponent implements OnInit {
  public savedHours!: HourlyData[];
  public savedHours$!: Observable<HourlyData[]>;
  public showDetails: boolean[] = [];

  constructor(
    private saveHours: SaveHoursService,
    private router: Router) { }

  ngOnInit(): void {
    this.savedHours = this.saveHours.showHours();
    this.savedHours$ = this.saveHours.returnObservable();
    for (let i =0; i< this.savedHours.length; i++) {
      this.showDetails.push(false);
    }
  }

  toggleDetails(index: number){
    this.showDetails[index] = ! this.showDetails[index];
  }

  deleteHour(hour: HourlyData) {
    this.saveHours.removeHour(hour);
    this.savedHours$ = this.saveHours.returnObservable();
  }

  deleteAll(){
    this.saveHours.clearHours();
    this.savedHours$ = this.saveHours.returnObservable();
  }

}
