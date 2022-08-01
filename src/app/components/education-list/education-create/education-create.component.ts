import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/interfaces/faculty';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.css'],
})
export class EducationCreateComponent implements OnInit {
  createEducationForm: FormGroup;
  faculties: Faculty[];
  isSubmitted: boolean = false;
  userId: number;

  constructor(
    private educationService: EducationService,
    private facultyService: FacultyService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.facultyService
      .getFaculties()
      .subscribe((facultades) => ({ next: (this.faculties = facultades) }));

    this.createEducationForm = this.formBuilder.group({
      degreeName: ['', Validators.required],
      startingDate: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
        ],
      ],
      completitionDate: [
        '',
        Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}$'),
      ],
      faculty: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createEducationForm.valid) {
      console.log('here');
      let educationDto = {
        degreeName: this.createEducationForm.get('degreeName').value,
        startingDate: this.createEducationForm.get('startingDate').value,
        facultyId: this.createEducationForm.get('faculty').value,
        userId: this.userId,
      };
      if (this.createEducationForm.get('completitionDate').value) {
        educationDto['url'] =
          this.createEducationForm.get('completitionDate').value;
      }
      
      this.educationService.createEducation(educationDto).subscribe({
        next: (education) =>
          this.router.navigate(['../../'], {
            relativeTo: this.activatedRoute,
          }),

        error: (error) => {
          console.log(error);
        },
        complete: () => console.log('complete'),
      });
      this.isSubmitted = false;
    }
  }
}
