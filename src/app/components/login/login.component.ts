import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  submitLogin() {
    var route = this.router;
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      console.log('here');
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value).subscribe({
        //next (paso exitoso)
        next: (user) => {
          // console.log(user);
          route.navigate(['/home']);
          // if(this.auth.currentUserValue["pets"] && this.auth.currentUserValue["pets"].length == 0) {
          //   route.navigate(['pets/add'])
          // }
          // else {
          //   route.navigate(['pets'])
          // }
        },
        //nombre | (nombre) | () => { line1; line2 }
        //error (paso erroneo)
        error: (error) => {
          console.log(error);
        },
        //complete (paso sí o sí)
        complete: () => console.log('complete'),
      });
      this.isSubmitted = false;
    }
  }
}
