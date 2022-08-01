import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-university-create',
  templateUrl: './university-create.component.html',
  styleUrls: ['./university-create.component.css'],
})
export class UniversityCreateComponent implements OnInit {
  createUniversityForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private universityService: UniversityService
  ) {}

  ngOnInit(): void {
    this.createUniversityForm = this.formBuilder.group({
      name: ['', Validators.required],
      url: [''],
      imageUrl: [''],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createUniversityForm.valid) {
      console.log('here');
      let universityDto = {
        name: this.createUniversityForm.get('name').value,
      };
      if (this.createUniversityForm.get('url').value) {
        universityDto['url'] = this.createUniversityForm.get('url').value;
      }
      if (this.createUniversityForm.get('imageUrl').value) {
        universityDto['imageUrl'] =
          this.createUniversityForm.get('imageUrl').value;
      }

      this.universityService.createUniversity(universityDto).subscribe({
        next: (university) =>
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
