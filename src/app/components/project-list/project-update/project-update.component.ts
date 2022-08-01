import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css'],
})
export class ProjectUpdateComponent implements OnInit {
  updateProjectForm: FormGroup;
  proyectoId: number;
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouterService: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.activateRouterService.queryParams.subscribe((param) => {
      this.proyectoId = param.proyectoId;
    });

    this.projectService.getProyecto(this.proyectoId).subscribe({
      //next (paso exitoso)
      next: (project) =>
        this.updateProjectForm.setValue({
          name: project.name,
          description: project.description,
          url: project.url,
          githubUrl: project.githubUrl,
          imageUrl: project.imageUrl,
        }),
      //nombre | (nombre) | () => { line1; line2 }
      //error (paso erroneo)
      error: (error) => console.log(error),
      //complete (paso sí o sí)
      complete: () => console.log('complete'),
    });

    this.updateProjectForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      url: [''],
      githubUrl: [''],
      imageUrl: [''],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.updateProjectForm.valid) {
      console.log('here');
      let projectDto = {
        name: this.updateProjectForm.get('name').value,
        description: this.updateProjectForm.get('description').value,
        userId: this.userId,
      };
      if (this.updateProjectForm.get('url').value) {
        projectDto['url'] = this.updateProjectForm.get('url').value;
      }
      if (this.updateProjectForm.get('githubUrl').value) {
        projectDto['githubUrl'] = this.updateProjectForm.get('githubUrl').value;
      }
      if (this.updateProjectForm.get('url').value) {
        projectDto['imageUrl'] = this.updateProjectForm.get('imageUrl').value;
      }

      this.projectService.updateProject(this.proyectoId, projectDto).subscribe({
        next: (project) =>
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
