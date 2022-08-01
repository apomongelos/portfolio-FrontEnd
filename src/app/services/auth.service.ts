import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserToken } from '../interfaces/user-token';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl + 'auth/';
  // currentUser: UserToken = new UserToken();
  private currentUserSubject = new BehaviorSubject<UserToken>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private httpClient: HttpClient) {
    if (this.loggedIn()) {
      const user: UserToken = JSON.parse(localStorage.getItem('user'));
      this.setCurrentUser(user);
    }
  }

  login(user: any) {
    return this.httpClient.post(this.baseUrl + 'login', user).pipe(
      map((response: UserToken) => {
        const user = response;
        if (user) {
          console.log(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  loggedIn(): boolean {
    console.log('logged in');
    const user: UserToken = JSON.parse(localStorage.getItem('user'));
    return !!user;
    // return localStorage.getItem('user') !== null;
  }

  register() {}

  setCurrentUser(user: UserToken) {
    this.currentUserSubject.next(user);
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }
}
