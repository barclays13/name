import {
  DataEntryComponent, FemaleComponent,
  GenderSelectionComponent,
  MaleComponent,
  NameListManagementComponent,
  WelcomeComponent
} from './components';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'gender-selection', component: GenderSelectionComponent },
  { path: 'data-entry', component: DataEntryComponent },
  { path: 'boy', component: MaleComponent },
  { path: 'girl', component: FemaleComponent },
  { path: 'name-list-management', component: NameListManagementComponent },
  { path: '**', redirectTo: '/welcome' } // Redirect any unknown routes to welcome
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
