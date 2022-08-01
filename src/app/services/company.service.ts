import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Company } from '../interfaces/company';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  baseUrl = environment.baseUrl + 'companies/';

  constructor(private httpClient: HttpClient) {}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(this.baseUrl);
  }

  createCompany(company: any) {
    var data: {};
    console.log(company);
    return this.httpClient.post(this.baseUrl, company);
  }
}
