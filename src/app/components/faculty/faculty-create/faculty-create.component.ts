import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { University } from 'src/app/interfaces/university';
import { FacultyService } from 'src/app/services/faculty.service';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-faculty-create',
  templateUrl: './faculty-create.component.html',
  styleUrls: ['./faculty-create.component.css'],
})
export class FacultyCreateComponent implements OnInit {
  createFacultyForm: FormGroup;
  isSubmitted: boolean = false;
  universities: University[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private facultyService: FacultyService,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.universityService.getUniversities().subscribe((universities) => ({
      next: (this.universities = universities),
    }));

    this.createFacultyForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: [''],
      imageUrl: [''],
      university: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createFacultyForm.valid) {
      console.log('here');
      let facultyDto = {
        name: this.createFacultyForm.get('name').value,
        universityId: this.createFacultyForm.get('university').value,
      };
      if (this.createFacultyForm.get('url').value) {
        facultyDto['url'] = this.createFacultyForm.get('url').value;
      }
      if (this.createFacultyForm.get('imageUrl').value) {
        facultyDto['imageUrl'] = this.createFacultyForm.get('imageUrl').value;
      }

      this.facultyService.createFaculty(facultyDto).subscribe({
        next: (faculty) =>
          this.router.navigate(['../'], {
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
