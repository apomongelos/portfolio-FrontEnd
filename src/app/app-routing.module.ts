import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityCreateComponent } from './components/city/city-create/city-create.component';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';
import { EducationCreateComponent } from './components/education-list/education-create/education-create.component';
import { EducationUpdateComponent } from './components/education-list/education-update/education-update.component';
import { FacultyCreateComponent } from './components/faculty/faculty-create/faculty-create.component';
import { HomeComponent } from './components/home/home.component';
import { JobExperienceCreateComponent } from './components/job-experience-list/job-experience-create/job-experience-create.component';
import { JobExperienceUpdateComponent } from './components/job-experience-list/job-experience-update/job-experience-update.component';
import { JobTitleCreateComponent } from './components/job-title/job-title-create/job-title-create.component';
import { JobTypeCreateComponent } from './components/job-type/job-type-create/job-type-create.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { ProjectCreateComponent } from './components/project-list/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/project-list/project-update/project-update.component';
import { SkillCreateComponent } from './components/skill-list/skill-create/skill-create.component';
import { SkillUpdateComponent } from './components/skill-list/skill-update/skill-update.component';
import { SkillAddComponent } from './components/skill/skill-add/skill-add.component';
import { UniversityCreateComponent } from './components/university/university-create/university-create.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'education/add', component: EducationCreateComponent },
      { path: 'education/update', component: EducationUpdateComponent },
      { path: 'education/add/faculty', component: FacultyCreateComponent },
      {
        path: 'education/add/faculty/university',
        component: UniversityCreateComponent,
      },
      { path: 'job-experience/add', component: JobExperienceCreateComponent },
      { path: 'job-experience/add/company', component: CompanyCreateComponent },
      { path: 'job-experience/add/city', component: CityCreateComponent },
      {
        path: 'job-experience/add/job-title',
        component: JobTitleCreateComponent,
      },
      {
        path: 'job-experience/add/job-type',
        component: JobTypeCreateComponent,
      },
      {
        path: 'job-experience/update',
        component: JobExperienceUpdateComponent,
      },
      { path: 'skill/add', component: SkillCreateComponent },
      { path: 'skill/add/skill', component: SkillAddComponent },
      { path: 'skill/update', component: SkillUpdateComponent },
      { path: 'project/add', component: ProjectCreateComponent },
      { path: 'project/update', component: ProjectUpdateComponent },
      { path: 'profile/update', component: ProfileUpdateComponent },
    ],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
