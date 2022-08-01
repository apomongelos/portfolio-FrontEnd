import { Skill } from './skill';
import { User } from './user';

export interface UserSkill {
  skill: Skill;
  user: User;
  level: number;
}
