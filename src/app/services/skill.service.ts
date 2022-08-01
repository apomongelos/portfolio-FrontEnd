import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../interfaces/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  baseUrl = environment.baseUrl + 'skills/';

  constructor(private httpClient: HttpClient) {}

  getSkills(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.baseUrl);
  }

  getSkill(id: string): Observable<Skill> {
    return this.httpClient.get<Skill>(this.baseUrl + id);
  }

  createSkill(skill: any) {
    var data: {};
    console.log(skill);
    return this.httpClient.post(this.baseUrl, skill);
  }
}
