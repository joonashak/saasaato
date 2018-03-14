import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './ui/menu/menu.component';
import { DataEntryComponent } from './views/data-entry/data-entry.component';
import { AnalysisComponent } from './views/analysis/analysis.component';
import { RouterModule, Routes } from '@angular/router';
import { ResetWidgetComponent } from './ui/reset-widget/reset-widget.component';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from './services/location.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ObservationService } from './services/observation.service';
import { ToastModule } from 'ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemperatureChartComponent } from './ui/temperature-chart/temperature-chart.component';

const routes: Routes = [
  { path: '', redirectTo: 'entry', pathMatch: 'full' },
  { path: 'analysis', component: AnalysisComponent },
  { path: '**', component: DataEntryComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DataEntryComponent,
    AnalysisComponent,
    ResetWidgetComponent,
    TemperatureChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    ToastModule.forRoot(),
  ],
  providers: [
    LocationService,
    ObservationService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
