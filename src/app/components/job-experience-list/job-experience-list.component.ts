import { Component, Input, OnInit } from '@angular/core';

import { JobExperience } from 'src/app/interfaces/job_experience';
import { JobExperienceService } from 'src/app/services/job-experience.service';

@Component({
  selector: 'app-job-experience-list',
  templateUrl: './job-experience-list.component.html',
  styleUrls: ['./job-experience-list.component.css'],
})
export class JobExperienceListComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  experiencias!: JobExperience[];

  constructor(private experienciaService: JobExperienceService) {}

  ngOnInit(): void {
    this.experienciaService
      .getExperiencias()
      .subscribe((experiencias) => (this.experiencias = experiencias));
  }
}
