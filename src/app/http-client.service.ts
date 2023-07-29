import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  public getHttpClient() {
    return this.http
  }

  public getBackendUrl() {
    return "https://flight2cal-backend.kseb.veltrus.de"
  }

  constructor(private readonly http: HttpClient) {
  }
}
