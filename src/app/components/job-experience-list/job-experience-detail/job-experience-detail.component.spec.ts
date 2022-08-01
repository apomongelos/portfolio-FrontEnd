import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExperienceDetailComponent } from './job-experience-detail.component';

describe('JobExperienceDetailComponent', () => {
  let component: JobExperienceDetailComponent;
  let fixture: ComponentFixture<JobExperienceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobExperienceDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExperienceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
