import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkillListComponent } from './skill-list.component';
import { SkillDetailComponent } from './skill-detail/skill-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SkillListComponent, SkillDetailComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [SkillListComponent, SkillDetailComponent],
})
export class SkillModule {}
