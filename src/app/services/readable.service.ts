import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
Base service to interact with readable API endpoints.
 */
@Injectable()
export class ReadableService {
  url: string;
  http: HttpClient;

  constructor(url: string, http: HttpClient) {
    this.url = url;
    this.http = http;
  }

  // Get all documents
  getAll() {
    return this.http.get(this.url);
  }
}
