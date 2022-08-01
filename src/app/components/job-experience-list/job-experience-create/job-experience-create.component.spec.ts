import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExperienceCreateComponent } from './job-experience-create.component';

describe('JobExperienceCreateComponent', () => {
  let component: JobExperienceCreateComponent;
  let fixture: ComponentFixture<JobExperienceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobExperienceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobExperienceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
