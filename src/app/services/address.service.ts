import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Address } from '../interfaces/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  baseUrl = environment.baseUrl + 'addresses';

  constructor(private httpClient: HttpClient) {}

  getAddressByUserEmail(email: string) {
    return this.httpClient.get<Address>(this.baseUrl + '?email=' + email);
  }
}
