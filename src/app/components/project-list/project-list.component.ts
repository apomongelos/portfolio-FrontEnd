import { Component, Input, OnInit } from '@angular/core';
import { Project } from 'src/app/interfaces/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  proyectos: Project[];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService
      .getProyectos()
      .subscribe((proyectos) => (this.proyectos = proyectos));
  }
}
