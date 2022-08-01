import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EducationListComponent } from './education-list.component';
import { EducationDetailComponent } from './education-detail/education-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

// import { EducationUpdateComponent } from './education-update/education-update.component';

@NgModule({
  declarations: [EducationListComponent, EducationDetailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [EducationListComponent, EducationDetailComponent],
})
export class EducationModule {}
