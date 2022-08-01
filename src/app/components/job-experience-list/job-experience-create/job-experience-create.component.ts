import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/interfaces/city';
import { Company } from 'src/app/interfaces/company';
import { JobTitle } from 'src/app/interfaces/job_title';
import { JobType } from 'src/app/interfaces/job_type';
import { AuthService } from 'src/app/services/auth.service';
import { CityService } from 'src/app/services/city.service';
import { CompanyService } from 'src/app/services/company.service';
import { JobExperienceService } from 'src/app/services/job-experience.service';
import { JobTitleService } from 'src/app/services/job-title.service';
import { JobTypeService } from 'src/app/services/job-type.service';

@Component({
  selector: 'app-job-experience-create',
  templateUrl: './job-experience-create.component.html',
  styleUrls: ['./job-experience-create.component.css'],
})
export class JobExperienceCreateComponent implements OnInit {
  createJobForm: FormGroup;
  companies: Company[];
  jobTypes: JobType[];
  jobTitles: JobTitle[];
  cities: City[];
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private companyService: CompanyService,
    private jobTitleService: JobTitleService,
    private jobTypeService: JobTypeService,
    private cityService: CityService,
    private auth: AuthService,
    private activatedRoute: ActivatedRoute,
    private jobExperienceService: JobExperienceService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.companyService
      .getCompanies()
      .subscribe((companies) => ({ next: (this.companies = companies) }));
    this.jobTitleService
      .getJobTitles()
      .subscribe((jobTitles) => ({ next: (this.jobTitles = jobTitles) }));
    this.jobTypeService
      .getJobTypes()
      .subscribe((jobTypes) => ({ next: (this.jobTypes = jobTypes) }));
    this.cityService
      .getCities()
      .subscribe((cities) => ({ next: (this.cities = cities) }));

    this.createJobForm = this.formBuilder.group({
      startDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
        ],
      ],
      endDate: ['', Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$')],
      profileDescription: ['', Validators.required],
      imageUrl: [''],
      city: ['', Validators.required],
      company: ['', Validators.required],
      jobType: ['', Validators.required],
      jobTitle: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createJobForm.valid) {
      console.log('here');
      let jobDto = {
        profileDescription: this.createJobForm.get('profileDescription').value,
        startDate: this.createJobForm.get('startDate').value,
        cityId: this.createJobForm.get('city').value,
        companyId: this.createJobForm.get('company').value,
        jobTypeId: this.createJobForm.get('jobType').value,
        jobTitleId: this.createJobForm.get('jobTitle').value,
        userId: this.userId,
      };
      if (this.createJobForm.get('endDate').value) {
        jobDto['url'] = this.createJobForm.get('endDate').value;
      }
      if (this.createJobForm.get('imageUrl').value) {
        jobDto['url'] = this.createJobForm.get('imageUrl').value;
      }

      this.jobExperienceService.createJobExperience(jobDto).subscribe({
        next: (job) =>
          this.router.navigate(['../../'], {
            relativeTo: this.activatedRoute,
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
