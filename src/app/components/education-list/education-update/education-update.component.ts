import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Faculty } from 'src/app/interfaces/faculty';
import { AuthService } from 'src/app/services/auth.service';
import { EducationService } from 'src/app/services/education.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-education-update',
  templateUrl: './education-update.component.html',
  styleUrls: ['./education-update.component.css'],
})
export class EducationUpdateComponent implements OnInit {
  updateEducationForm: FormGroup;
  educacionId: number;
  faculties: Faculty[];
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouterService: ActivatedRoute,
    private estudioService: EducationService,
    private facultyService: FacultyService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.activateRouterService.queryParams.subscribe((param) => {
      this.educacionId = param.educacionId;
    });

    this.facultyService
      .getFaculties()
      .subscribe((facultades) => ({ next: (this.faculties = facultades) }));

    this.updateEducationForm = this.formBuilder.group({
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

    this.estudioService.getEstudio(this.educacionId).subscribe({
      //next (paso exitoso)
      next: (educacion) =>
        this.updateEducationForm.setValue({
          degreeName: educacion.degreeName,
          startingDate: educacion.startingDate,
          completitionDate: educacion.completitionDate,
          faculty: educacion.faculty.id,
        }),
      //nombre | (nombre) | () => { line1; line2 }
      //error (paso erroneo)
      error: (error) => console.log(error),
      //complete (paso sí o sí)
      complete: () => console.log('complete'),
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.updateEducationForm.valid) {
      console.log('here');
      let educationDto = {
        degreeName: this.updateEducationForm.get('degreeName').value,
        startingDate: this.updateEducationForm.get('startingDate').value,
        facultyId: this.updateEducationForm.get('faculty').value,
        userId: this.userId,
      };
      if (this.updateEducationForm.get('completitionDate').value) {
        educationDto['url'] =
          this.updateEducationForm.get('completitionDate').value;
      }      
      this.estudioService
        .updateEducation(this.educacionId, educationDto)
        .subscribe({
          next: (education) =>
            this.router.navigate(['../../'], {
              relativeTo: this.activateRouterService,
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
