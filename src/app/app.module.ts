import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';

import { EducationModule } from './components/education-list/education.module';
import { JobExperienceModule } from './components/job-experience-list/job-experience.module';
import { ProjectModule } from './components/project-list/project.module';
import { SkillModule } from './components/skill-list/skill.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { EducationCreateComponent } from './components/education-list/education-create/education-create.component';
import { EducationUpdateComponent } from './components/education-list/education-update/education-update.component';
import { JobExperienceCreateComponent } from './components/job-experience-list/job-experience-create/job-experience-create.component';
import { JobExperienceUpdateComponent } from './components/job-experience-list/job-experience-update/job-experience-update.component';
import { SkillCreateComponent } from './components/skill-list/skill-create/skill-create.component';
import { SkillUpdateComponent } from './components/skill-list/skill-update/skill-update.component';
import { ProjectCreateComponent } from './components/project-list/project-create/project-create.component';
import { ProjectUpdateComponent } from './components/project-list/project-update/project-update.component';
import { CityCreateComponent } from './components/city/city-create/city-create.component';
import { CompanyCreateComponent } from './components/company/company-create/company-create.component';
import { JobTypeCreateComponent } from './components/job-type/job-type-create/job-type-create.component';
import { JobTitleCreateComponent } from './components/job-title/job-title-create/job-title-create.component';
import { FacultyCreateComponent } from './components/faculty/faculty-create/faculty-create.component';
import { SkillAddComponent } from './components/skill/skill-add/skill-add.component';
import { UniversityCreateComponent } from './components/university/university-create/university-create.component';
import { ProfileUpdateComponent } from './components/profile/profile-update/profile-update.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    NavBarComponent,
    ContactComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    EducationCreateComponent,
    EducationUpdateComponent,
    JobExperienceCreateComponent,
    JobExperienceUpdateComponent,
    SkillCreateComponent,
    SkillUpdateComponent,
    ProjectCreateComponent,
    ProjectUpdateComponent,
    CityCreateComponent,
    CompanyCreateComponent,
    JobTypeCreateComponent,
    JobTitleCreateComponent,
    FacultyCreateComponent,
    SkillAddComponent,
    UniversityCreateComponent,
    ProfileUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EducationModule,
    JobExperienceModule,
    ProjectModule,
    SkillModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
