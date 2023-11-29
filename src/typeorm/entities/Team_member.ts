import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { Task } from './Task';
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

  }
  