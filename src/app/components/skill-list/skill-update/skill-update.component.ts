import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/interfaces/skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-skill-update',
  templateUrl: './skill-update.component.html',
  styleUrls: ['./skill-update.component.css'],
})
export class SkillUpdateComponent implements OnInit {
  updateSkillUserForm: FormGroup;
  skillId: number;
  skills: Skill[];
  userId: number;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activateRouterService: ActivatedRoute,
    private usrSkillService: UserSkillService,
    private skillService: SkillService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.activateRouterService.queryParams.subscribe((param) => {
      this.skillId = param.skillId;
    });

    this.skillService
      .getSkills()
      .subscribe((skills) => ({ next: (this.skills = skills) }));

    this.usrSkillService
      .getUserSkill(`${this.userId}_${this.skillId}`)
      .subscribe({
        //next (paso exitoso)
        next: (skill) =>
          this.updateSkillUserForm.setValue({
            skill: skill.skill.id,
            level: skill.level,
          }),
        //nombre | (nombre) | () => { line1; line2 }
        //error (paso erroneo)
        error: (error) => console.log(error),
        //complete (paso sí o sí)
        complete: () => console.log('complete'),
      });

    this.updateSkillUserForm = this.formBuilder.group({
      level: ['', Validators.required],
      skill: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.updateSkillUserForm.valid) {
      console.log('here');
      let usrSkillDto = {
        level: this.updateSkillUserForm.get('level').value,
        skillId: +this.updateSkillUserForm.get('skill').value,
        userId: this.userId,
      };

      this.usrSkillService
        .updateUserSkill(`${this.userId}_${this.skillId}`, usrSkillDto)
        .subscribe({
          next: (usrSkill) =>
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
