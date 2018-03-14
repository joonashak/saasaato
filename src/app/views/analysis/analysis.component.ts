import { Component, OnInit } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { LocationService } from '../../services/location.service';

/*
Analysis page: Presents information about the observations
recorded in the system.
 */
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
})
export class AnalysisComponent implements OnInit {
  latestObservations;
  temperatureRange24h;
  date = new Date();

  constructor(
    private locationService: LocationService,
    private observationService: ObservationService,
  ) {
  }

  ngOnInit() {
    this.observationService.getLatestForAll()
      .subscribe(observations => this.latestObservations = observations);

    this.observationService.getRange24hForAll()
      .subscribe(ranges => this.temperatureRange24h = ranges);
  }
}
