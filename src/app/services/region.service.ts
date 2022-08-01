import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Region } from '../interfaces/region';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  baseUrl = environment.baseUrl + 'regions/';

  constructor(private httpClient: HttpClient) {}

  getRegions(): Observable<Region[]> {
    return this.httpClient.get<Region[]>(this.baseUrl);
  }
}
