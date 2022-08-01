import { City } from './city';
import { Company } from './company';
import { JobTitle } from './job_title';
import { JobType } from './job_type';

export interface JobExperience {
  id: number;
  profileDescription?: string;
  startDate?: string;
  endDate?: string;
  imageUrl?: string;
  company: Company;
  jobTitle: JobTitle;
  jobType: JobType;
  city: City;
}
