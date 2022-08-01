import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-job-type-create',
  templateUrl: './job-type-create.component.html',
  styleUrls: ['./job-type-create.component.css'],
})
export class JobTypeCreateComponent implements OnInit {
  createJobTypeForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jobTypeService: JobTypeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createJobTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createJobTypeForm.valid) {
      console.log('here');
      this.jobTypeService
        .createJobType(this.createJobTypeForm.value)
        .subscribe({
          //next (paso exitoso)
          next: (jobType) =>
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
