import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { JobExperience } from 'src/app/interfaces/job_experience';

@Component({
  selector: 'app-job-experience-detail',
  templateUrl: './job-experience-detail.component.html',
  styleUrls: ['./job-experience-detail.component.css'],
})
export class JobExperienceDetailComponent implements OnInit {
  @Input() experiencia!: JobExperience;
  @Input() isLoggedIn: boolean;
  faPen = faPen;
  
  constructor() {}

  ngOnInit(): void {}
}
