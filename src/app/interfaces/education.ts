import { Faculty } from './faculty';

export interface Education {
  id: number;
  degreeName?: string;
  startingDate?: string;
  completitionDate?: string;
  faculty: Faculty;
}
