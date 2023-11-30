import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Team_member } from './Team_member';

  //import { Post } from './Post';
  //import { Profile } from './Profile';
  
  @Entity({ name: 'team' })
  export class Team {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ unique: true })
    team_name: string;

  
    @OneToMany(()=>Team_member,(team)=>team.name_of_team)
    members:Team_member[];

  }
  