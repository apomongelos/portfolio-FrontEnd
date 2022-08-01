import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Skill } from 'src/app/interfaces/skill';
import { AuthService } from 'src/app/services/auth.service';
import { SkillService } from 'src/app/services/skill.service';
import { UserSkillService } from 'src/app/services/user-skill.service';

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css'],
})
export class SkillCreateComponent implements OnInit {
  createSkillUserForm: FormGroup;
  skills: Skill[];
  isSubmitted: boolean = false;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private skillService: SkillService,
    private usrSkillService: UserSkillService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.auth.currentUserValue.userId;
    this.skillService
      .getSkills()
      .subscribe((skills) => ({ next: (this.skills = skills) }));

    this.createSkillUserForm = this.formBuilder.group({
      level: ['', Validators.required],
      skill: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createSkillUserForm.valid) {
      console.log('here');
      let usrSkillDto = {
        level: this.createSkillUserForm.get('level').value,
        skillId: +this.createSkillUserForm.get('skill').value,
        userId: this.userId,
      };

      this.usrSkillService.createUserSkill(usrSkillDto).subscribe({
        next: (usrSkill) =>
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
