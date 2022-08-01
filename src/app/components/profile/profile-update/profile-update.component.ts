import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  updateUsrForm: FormGroup;
  email: string;
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouterService: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.email = this.auth.currentUserValue.email;
    this.userId = this.auth.currentUserValue.userId;

    this.userService.getUserByEmail(this.email).subscribe({
      //next (paso exitoso)
      next: (usr) =>
        this.updateUsrForm.setValue({
          firstName: usr.firstName,
          lastName: usr.lastName,
          email: usr.email,
          aboutMe: usr.aboutMe,
          dateOfBirth: usr.dateOfBirth,
          username: usr.username,
        }),
      //nombre | (nombre) | () => { line1; line2 }
      //error (paso erroneo)
      error: (error) => console.log(error),
      //complete (paso sí o sí)
      complete: () => console.log('complete'),
    });

    this.updateUsrForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      aboutMe: ['', Validators.required],
      dateOfBirth: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
        ],
      ],
      username: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.updateUsrForm.valid) {
      console.log('here');
      let userDto = {
        firstName: this.updateUsrForm.get('firstName').value,
        lastName: this.updateUsrForm.get('lastName').value,
        email: this.updateUsrForm.get('email').value,
        aboutMe: this.updateUsrForm.get('aboutMe').value,
        dateOfBirth: this.updateUsrForm.get('dateOfBirth').value,
        userId: this.userId,
      };
      if (this.updateUsrForm.get('username').value) {
        userDto['username'] = this.updateUsrForm.get('username').value;
      }

      this.userService.updateUser(this.userId, userDto).subscribe({
        next: (usr) =>
          this.router.navigate(['../../'], {
            relativeTo: this.activateRouterService,
          }),

        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
      this.isSubmitted = false;
    }
  }
}
