import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ObservationService } from '../../services/observation.service';
import { ToastsManager } from 'ng2-toastr';

/*
Data entry page: Provides user with an interactively validated
form to input new data.
 */
@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
})
export class DataEntryComponent implements OnInit {
  locations;
  observations;
  // For focusing on temp field after submit
  @ViewChild('temperatureElement') temperatureElement: ElementRef;

  constructor(
    private locationService: LocationService,
    private observationService: ObservationService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.locationService.getAll()
      .subscribe(locations => this.locations = locations);
  }

  form = new FormGroup({
    temperature: new FormControl('', [
      Validators.required,
      Validators.min(-90),
      Validators.max(70),
      Validators.pattern('-?[0-9]*[,.]?[0-9]*'),
    ]),
    location: new FormControl('', Validators.required),
  });

  // Save new valid observation in the system
  submit() {
    if (this.form.invalid) {
      return;
    }

    let observation = {
      temperature: this.temperature.value.replace(',', '.'),
      location: this.locations[this.location.value],
    };

    this.observationService.create(observation)
      .subscribe(newObservation => {
        this.temperature.setValue('');
        this.temperature.markAsUntouched();

        this.temperatureElement.nativeElement.focus();

        this.toastr.success('Observation saved.');
      }, (error: Response) => {
        this.toastr.error('An error occured while saving the observation.');
      });
  }

  get temperature() {
    return this.form.get('temperature');
  }

  get location() {
    return this.form.get('location');
  }
}
