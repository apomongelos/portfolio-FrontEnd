import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill-add',
  templateUrl: './skill-add.component.html',
  styleUrls: ['./skill-add.component.css'],
})
export class SkillAddComponent implements OnInit {
  createSkillForm: FormGroup;
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createSkillForm = this.formBuilder.group({
      name: ['', Validators.required],
      imageUrl: [''],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createSkillForm.valid) {
      console.log('here');

      let skillDto = {
        name: this.createSkillForm.get('name').value,
      };
      if (this.createSkillForm.get('imageUrl').value) {
        skillDto['imageUrl'] = this.createSkillForm.get('imageUrl').value;
      }
      this.skillService.createSkill(skillDto).subscribe({
        //next (paso exitoso)
        next: (skill) =>
          this.router.navigate(['../'], {
            relativeTo: this.activatedRoute,
          }),
        //nombre | (nombre) | () => { line1; line2 }
        //error (paso erroneo)
        error: (error) => {
          console.log(error);
        },
        //complete (paso sí o sí)
        complete: () => console.log('complete'),
      });
      this.isSubmitted = false;
    }
  }
}
