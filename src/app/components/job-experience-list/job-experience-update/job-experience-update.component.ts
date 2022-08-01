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
  selector: 'app-job-experience-update',
  templateUrl: './job-experience-update.component.html',
  styleUrls: ['./job-experience-update.component.css'],
})
export class JobExperienceUpdateComponent implements OnInit {
  updateJobForm: FormGroup;
  experienciaId: number;
  companies: Company[];
  jobTypes: JobType[];
  jobTitles: JobTitle[];
  cities: City[];
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouterService: ActivatedRoute,
    private jobExperienceService: JobExperienceService,
    private companyService: CompanyService,
    private jobTitleService: JobTitleService,
    private jobTypeService: JobTypeService,
    private cityService: CityService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.activateRouterService.queryParams.subscribe((param) => {
      this.experienciaId = param.experienciaId;
    });

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

    this.updateJobForm = this.formBuilder.group({
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

    this.jobExperienceService.getExperiencia(this.experienciaId).subscribe({
      //next (paso exitoso)
      next: (expe) =>
        this.updateJobForm.setValue({
          startDate: expe.startDate,
          endDate: expe.endDate,
          profileDescription: expe.profileDescription,
          imageUrl: expe.imageUrl,
          company: expe.company.id,
          city: expe.city.id,
          jobTitle: expe.jobTitle.id,
          jobType: expe.jobType.id,
        }),
      //nombre | (nombre) | () => { line1; line2 }
      //error (paso erroneo)
      error: (error) => console.log(error),
      //complete (paso sí o sí)
      complete: () => console.log('complete'),
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.updateJobForm.valid) {
      console.log('here');
      let jobDto = {
        profileDescription: this.updateJobForm.get('profileDescription').value,
        startDate: this.updateJobForm.get('startDate').value,
        cityId: this.updateJobForm.get('city').value,
        companyId: this.updateJobForm.get('company').value,
        jobTypeId: this.updateJobForm.get('jobType').value,
        jobTitleId: this.updateJobForm.get('jobTitle').value,
        userId: this.userId,
      };
      if (this.updateJobForm.get('endDate').value) {
        jobDto['url'] = this.updateJobForm.get('endDate').value;
      }
      if (this.updateJobForm.get('imageUrl').value) {
        jobDto['url'] = this.updateJobForm.get('imageUrl').value;
      }
      this.jobExperienceService
        .updateJobExperience(this.experienciaId, jobDto)
        .subscribe({
          next: (job) =>
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
