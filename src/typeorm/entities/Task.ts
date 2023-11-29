import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team_member } from './Team_member';
//import { Post } from './Post';
//import { Profile } from './Profile';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  description: string;

  @Column('date')
  due_date: Date;

  @Column('varchar')
  assignee: string;

  @Column()
  status: string;


  @ManyToOne(()=>Team_member,(member)=>member.tasks)
  member:Team_member;
}
