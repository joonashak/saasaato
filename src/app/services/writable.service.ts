import { Injectable } from '@angular/core';
import { ReadableService } from './readable.service';
import { HttpClient } from '@angular/common/http';

/*
Base service to interact with readable & writeable API endpoints.
 */
@Injectable()
export class WritableService extends ReadableService {
  constructor(url: string, http: HttpClient) {
    super(url, http);
  }

  // Create new document
  create(observation) {
    return this.http.post(this.url, observation);
  }
}
