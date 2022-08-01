import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.baseUrl + 'users/';

  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string) {
    return this.httpClient.get<User>(this.baseUrl + email);
  }

  updateUser(userId: number, user: any) {
    return this.httpClient.put(this.baseUrl + userId, user);
  }
}
