import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Region } from 'src/app/interfaces/region';
import { CityService } from 'src/app/services/city.service';
import { RegionService } from 'src/app/services/region.service';

@Component({
  selector: 'app-city-create',
  templateUrl: './city-create.component.html',
  styleUrls: ['./city-create.component.css'],
})
export class CityCreateComponent implements OnInit {
  createCityForm: FormGroup;
  regions: Region[];
  isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private regionService: RegionService,
    private cityService: CityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.regionService
      .getRegions()
      .subscribe((regiones) => ({ next: (this.regions = regiones) }));

    this.createCityForm = this.formBuilder.group({
      name: ['', Validators.required],
      region: ['', Validators.required],
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.createCityForm.valid) {
      console.log('here');
      let cityDto = {
        name: this.createCityForm.get('name').value,
        regionId: this.createCityForm.get('region').value,
      };
      this.cityService.createCity(cityDto).subscribe({
        //next (paso exitoso)
        next: (city) =>
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
