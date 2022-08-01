import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Faculty } from '../interfaces/faculty';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  baseUrl = environment.baseUrl + 'faculties/';

  constructor(private httpClient: HttpClient) {}

  getFaculties(): Observable<Faculty[]> {
    return this.httpClient.get<Faculty[]>(this.baseUrl);
  }

  createFaculty(faculty: any) {
    var data: {};
    console.log(faculty);
    return this.httpClient.post(this.baseUrl, faculty);
  }
}
