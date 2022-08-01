import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProjectListComponent, ProjectDetailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [ProjectListComponent, ProjectDetailComponent],
})
export class ProjectModule {}
