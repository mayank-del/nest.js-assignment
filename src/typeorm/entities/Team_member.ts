import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Task } from './Task';
import { Team } from './Team';
  //import { Post } from './Post';
  //import { Profile } from './Profile';
  
  @Entity({ name: 'team_member' })
  export class Team_member {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column({ unique: true })
    member_name: string;

    @Column()
    password: string;
  
    @OneToMany(()=>Task,(task)=>task.member)
    tasks:Task[];

    @ManyToOne(()=>Team,(team)=>team.members)
    name_of_team:Team;

  }
  