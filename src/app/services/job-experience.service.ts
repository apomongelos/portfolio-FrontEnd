import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { JobExperience } from '../interfaces/job_experience';

@Injectable({
  providedIn: 'root',
})
export class JobExperienceService {
  baseUrl = environment.baseUrl + 'job_experiences/';

  constructor(private httpClient: HttpClient) {}

  getExperiencias(): Observable<JobExperience[]> {
    return this.httpClient.get<JobExperience[]>(this.baseUrl);
  }
  getExperiencia(id: number): Observable<JobExperience> {
    return this.httpClient.get<JobExperience>(this.baseUrl + id);
  }

  createJobExperience(jobExperience: any) {
    var data: {};
    console.log(jobExperience);
    return this.httpClient.post(this.baseUrl, jobExperience);
  }

  updateJobExperience(experienciaId: number, jobExperience: any) {
    return this.httpClient.put(this.baseUrl + experienciaId, jobExperience);
  }
}
