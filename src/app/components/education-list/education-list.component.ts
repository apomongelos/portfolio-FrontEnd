import { Component, Input, OnInit } from '@angular/core';

import { Education } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css'],
})
export class EducationListComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  estudios: Education[];

  constructor(private estudioService: EducationService) {}

  ngOnInit(): void {
    this.estudioService
      .getEstudios()
      .subscribe((estudios) => (this.estudios = estudios));
  }
}
