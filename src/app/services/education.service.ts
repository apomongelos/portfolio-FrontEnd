import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Education } from '../interfaces/education';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  baseUrl = environment.baseUrl + 'educations/';

  constructor(private httpClient: HttpClient) {}

  getEstudios(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(this.baseUrl);
  }

  getEstudio(id: number): Observable<Education> {
    return this.httpClient.get<Education>(this.baseUrl + id);
  }

  createEducation(education: any) {
    var data: {};
    console.log(education);
    return this.httpClient.post(this.baseUrl, education);
  }

  updateEducation(estudioId: number, estudio: any) {
    return this.httpClient.put(this.baseUrl + estudioId, estudio);
  }

  deleteEstudio(estudioId: number) {}
}
