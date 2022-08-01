import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  @Input() proyecto!: Project;
  @Input() isLoggedIn: boolean;
  faPen = faPen;

  constructor() {}

  ngOnInit(): void {}
}
