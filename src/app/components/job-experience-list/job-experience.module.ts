import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobExperienceListComponent } from './job-experience-list.component';
import { JobExperienceDetailComponent } from './job-experience-detail/job-experience-detail.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [JobExperienceListComponent, JobExperienceDetailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [JobExperienceListComponent],
})
export class JobExperienceModule {}
