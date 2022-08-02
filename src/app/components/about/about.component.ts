import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  usr: User = {} as User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService
      .getUserByEmail('fernando@correo.com')
      .subscribe((user) => (this.usr = user));
  }
}
