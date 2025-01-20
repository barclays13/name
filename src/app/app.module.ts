import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { ListboxModule } from 'primeng/listbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';

import { DataEntryComponent, GenderSelectionComponent, MainComponent, NameListManagementComponent, WelcomeComponent } from './components';
import { AppComponent } from './app.component';
import { MaleComponent } from './components/male/male.component';
import { FemaleComponent } from './components/female/female.component';

@NgModule({
  declarations: [AppComponent, MainComponent, WelcomeComponent, GenderSelectionComponent, DataEntryComponent, NameListManagementComponent, MaleComponent, FemaleComponent],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    ListboxModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    SelectButtonModule,
    TabViewModule,
    TableModule
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule {}
