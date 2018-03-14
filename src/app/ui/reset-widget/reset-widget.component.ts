import { Component, ViewContainerRef } from '@angular/core';
import { ObservationService } from '../../services/observation.service';
import { ToastsManager } from 'ng2-toastr';

/*
Provides the user with a simple reset & reload buttons to re-initialize the
backend's database with recent data. For demonstration purposes.
 */
@Component({
  selector: 'app-reset-widget',
  templateUrl: './reset-widget.component.html',
})
export class ResetWidgetComponent {
  loading = false;
  loaded = false;

  constructor(private observationService: ObservationService) { }

  reset() {
    this.loading = true;

    this.observationService.reset()
      .subscribe(() => {
        this.loading = false;
        this.loaded = true;
      });
  }

  reload() {
    window.location.reload();
  }
}
