import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobTitleService } from 'src/app/services/job-title.service';

@Component({
  selector: 'app-job-title-create',
  templateUrl: './job-title-create.component.html',
  styleUrls: ['./job-title-create.component.css'],
})
export class JobTitleCreateComponent implements OnInit {
  createJobTitleForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private jobTitleService: JobTitleService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createJobTitleForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createJobTitleForm.valid) {
      console.log('here');
      this.jobTitleService
        .createJobTitle(this.createJobTitleForm.value)
        .subscribe({
          //next (paso exitoso)
          next: (jobTitle) =>
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
