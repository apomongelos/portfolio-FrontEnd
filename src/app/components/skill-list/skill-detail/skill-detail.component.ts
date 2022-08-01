import { Component, Input, OnInit } from '@angular/core';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Skill } from 'src/app/interfaces/skill';
import { UserSkill } from 'src/app/interfaces/user-skill';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.css'],
})
export class SkillDetailComponent implements OnInit {
  @Input() userSkill!: UserSkill;
  @Input() isLoggedIn: boolean;
  faPen = faPen;

  constructor() {}

  ngOnInit(): void {}
}
