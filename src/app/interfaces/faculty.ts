import { University } from './university';

export interface Faculty {
  id: number;
  name: string;
  url?: string;
  imageUrl?: string;
  university: University;
}
