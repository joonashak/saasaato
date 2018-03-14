import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WritableService } from './writable.service';

/*
Service to interact with API's observation collection
 */
@Injectable()
export class ObservationService extends WritableService {
  constructor(http: HttpClient) {
    super('https://saasaato-backend.herokuapp.com/api/observations', http);
  }

  // Get all observations at given location
  getAllByLocation(location) {
    return this.http.get(this.url + '/all/' + location.name);
  }

  // Get the latest observation for each location
  getLatestForAll() {
    return this.http.get(this.url + '/latest/all');
  }

  // Get the max and min temperature for each location
  getRange24hForAll() {
    return this.http.get(this.url + '/range24h');
  }

  // Get all observations grouped by location
  getAllGrouped() {
    return this.http.get(this.url + '/all/grouped');
  }

  // Empty the db and initialize with computer-generated data
  reset() {
    return this.http.get(this.url + '/reset');
  }
}
