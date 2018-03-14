import { Injectable } from '@angular/core';
import { ReadableService } from './readable.service';
import { HttpClient } from '@angular/common/http';

/*
Service to interact with API's location collection
 */
@Injectable()
export class LocationService extends ReadableService {
  constructor(http: HttpClient) {
    super('https://saasaato-backend.herokuapp.com/api/locations', http);
  }
}
