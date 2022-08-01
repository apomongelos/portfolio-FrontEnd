import { Country } from './country';

export interface Region {
  id: number;
  name: string;
  country: Country;
}
