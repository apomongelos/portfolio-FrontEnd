import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserSkill } from '../interfaces/user-skill';

@Injectable({
  providedIn: 'root',
})
export class UserSkillService {
  baseUrl = environment.baseUrl + 'users_skills/';

  constructor(private httpClient: HttpClient) {}

  getUserSkills(): Observable<UserSkill[]> {
    return this.httpClient.get<UserSkill[]>(this.baseUrl);
  }

  getUserSkillsByUserId(id: number): Observable<UserSkill[]> {
    return this.httpClient.get<UserSkill[]>(this.baseUrl + id);
  }

  getUserSkill(id: string): Observable<UserSkill> {
    return this.httpClient.get<UserSkill>(this.baseUrl + id);
  }

  createUserSkill(usrSkill: any) {
    var data: {};
    console.log(usrSkill);
    return this.httpClient.post(this.baseUrl, usrSkill);
  }

  updateUserSkill(userSkillId: string, usrSkill: any) {
    return this.httpClient.put(this.baseUrl + userSkillId, usrSkill);
  }
}
