import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExperienceUpdateComponent } from './job-experience-update.component';

describe('JobExperienceUpdateComponent', () => {
  let component: JobExperienceUpdateComponent;
  let fixture: ComponentFixture<JobExperienceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobExperienceUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExperienceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
