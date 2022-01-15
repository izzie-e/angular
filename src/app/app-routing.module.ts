import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { ViewDetailsComponent } from './components/main/view-details/view-details.component';
import { SavedComponent } from './components/saved/saved.component';
import { FetchGuardGuard } from './guards/fetch-guard.guard';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'saved', component: SavedComponent, canLoad: [FetchGuardGuard]},
  {path: ':id', component: ViewDetailsComponent, canLoad: [FetchGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
