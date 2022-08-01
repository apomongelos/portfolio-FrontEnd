import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JobTitle } from '../interfaces/job_title';

@Injectable({
  providedIn: 'root',
})
export class JobTitleService {
  baseUrl = environment.baseUrl + 'job_titles/';

  constructor(private httpClient: HttpClient) {}

  getJobTitles(): Observable<JobTitle[]> {
    return this.httpClient.get<JobTitle[]>(this.baseUrl);
  }

  createJobTitle(jobTitle: any) {
    var data: {};
    console.log(jobTitle);
    return this.httpClient.post(this.baseUrl, jobTitle);
  }
}
