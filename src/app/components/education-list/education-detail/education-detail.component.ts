import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Education } from 'src/app/interfaces/education';

@Component({
  selector: 'app-education-detail',
  templateUrl: './education-detail.component.html',
  styleUrls: ['./education-detail.component.css'],
})
export class EducationDetailComponent implements OnInit {
  @Input() estudio!: Education;
  @Input() isLoggedIn: boolean;
  faPen = faPen;
  constructor() {}

  ngOnInit(): void {}
}
