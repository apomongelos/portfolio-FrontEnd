import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css'],
})
export class ProjectCreateComponent implements OnInit {
  createProjectForm: FormGroup;
  isSubmitted: boolean = false;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private auth: AuthService,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.createProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
      githubUrl: [''],
      imageUrl: [''],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createProjectForm.valid) {
      console.log('here');
      let projectDto = {
        name: this.createProjectForm.get('name').value,
        description: this.createProjectForm.get('description').value,
        userId: this.userId,
      };
      if (this.createProjectForm.get('url').value) {
        projectDto['url'] = this.createProjectForm.get('url').value;
      }
      if (this.createProjectForm.get('githubUrl').value) {
        projectDto['githubUrl'] = this.createProjectForm.get('githubUrl').value;
      }
      if (this.createProjectForm.get('url').value) {
        projectDto['imageUrl'] = this.createProjectForm.get('imageUrl').value;
      }

      this.projectService.createProject(projectDto).subscribe({
        next: (project) =>
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
