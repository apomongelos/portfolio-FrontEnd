import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { University } from '../interfaces/university';

@Injectable({
  providedIn: 'root',
})
export class UniversityService {
  baseUrl = environment.baseUrl + 'universities/';

  constructor(private httpClient: HttpClient) {}

  getUniversities(): Observable<University[]> {
    return this.httpClient.get<University[]>(this.baseUrl);
  }

  createUniversity(university: any) {
    var data: {};
    console.log(university);
    return this.httpClient.post(this.baseUrl, university);
  }
}
