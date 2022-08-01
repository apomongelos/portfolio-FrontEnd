import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css'],
})
export class CompanyCreateComponent implements OnInit {
  createCompanyForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createCompanyForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createCompanyForm.valid) {
      console.log('here');
      this.companyService
        .createCompany(this.createCompanyForm.value)
        .subscribe({
          //next (paso exitoso)
          next: (company) =>
            this.router.navigate(['../'], {
              relativeTo: this.activatedRoute,
            }),
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
