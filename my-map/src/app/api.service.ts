import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Ensures that the service is available globally
})
export class ApiService {
  private baseUrl = 'https://api.worldbank.org/v2/country/';

  constructor(private http: HttpClient) {}

  getLifeExpectancy(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${countryCode}/indicator/SP.DYN.LE00.IN?format=json`);
  }

  getGDP(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${countryCode}/indicator/NY.GDP.MKTP.CD?format=json`);
  }

  getCountryData(countryCode: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${countryCode}?format=json`);
  }
}