import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobType } from '../interfaces/job_type';

@Injectable({
  providedIn: 'root',
})
export class JobTypeService {
  baseUrl = environment.baseUrl + 'job_types/';

  constructor(private httpClient: HttpClient) {}

  getJobTypes(): Observable<JobType[]> {
    return this.httpClient.get<JobType[]>(this.baseUrl);
  }

  createJobType(jobType: any) {
    var data: {};
    console.log(jobType);
    return this.httpClient.post(this.baseUrl, jobType);
  }
}
