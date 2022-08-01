import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/interfaces/skill';
import { UserSkill } from 'src/app/interfaces/user-skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.css'],
})
export class SkillListComponent implements OnInit {
  @Input() isLoggedIn: boolean;
  skills: UserSkill[];
  userId: number;

  constructor(
    private skillService: SkillService,
    private userSkillService: UserSkillService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.userSkillService
      .getUserSkills()
      .subscribe((skills) => (this.skills = skills));
    // this.userSkillService
    //   .getUserSkillsByUserId(9)
    //   .subscribe((skills) => (this.userSkills = skills));
  }
}
