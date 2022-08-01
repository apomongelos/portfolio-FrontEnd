import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserToken } from 'src/app/interfaces/user-token';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  // isLoggedIn: Boolean = false;
  // currentUser$: Observable<UserToken>;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
