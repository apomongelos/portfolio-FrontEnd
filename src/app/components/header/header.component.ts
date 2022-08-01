import { Component, OnInit } from '@angular/core';
import {
  faGithub,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { Address } from 'src/app/interfaces/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faGithub = faGithub;
  faLinkedin = faLinkedin;
  faTwitter = faTwitter;
  address: Address;

  constructor(private addressService: AddressService) {}

  ngOnInit(): void {
    this.addressService
      .getAddressByUserEmail('carlos@gmail.com')
      .subscribe((add) => (this.address = add));
  }
}
