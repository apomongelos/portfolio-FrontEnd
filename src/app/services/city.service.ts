import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../interfaces/city';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  baseUrl = environment.baseUrl + 'cities/';

  constructor(private httpClient: HttpClient) {}

  getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.baseUrl);
  }

  createCity(city: any) {
    var data: {};
    console.log(city);
    return this.httpClient.post(this.baseUrl, city);
  }
}
