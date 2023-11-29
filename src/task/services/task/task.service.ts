import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../typeorm/entities/Task';
import { Repository } from 'typeorm';
import { CreateTaskParams, UpdateTaskParams,CreateTeamMember } from 'src/types/types';
import { Team_member } from 'src/typeorm/entities/Team_member';
import * as jwt from 'jsonwebtoken';
//import { UpdateTaskDto } from 'src/task/dtos/UpdateUser.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Team_member) private teamMemberRepository: Repository<Team_member>,
  ) {}

  async login(bodyData:CreateTeamMember) {
    const user=await this.teamMemberRepository.findOne({where: { member_name: bodyData.member_name }})
    if(!user)
    throw new HttpException(
        'User not found. Cannot Login!',
        HttpStatus.UNAUTHORIZED,
      );
    if(user.password!==bodyData.password)
    throw new HttpException(
        'Incorrect password!',
        HttpStatus.UNAUTHORIZED,
      );
      //console.log();
      
      const token=jwt.sign({id:user.id,uname:user.member_name},process.env.SECRET, { expiresIn: '1h' });
    return {message:"login successfully!",token:token}
  }
  createTeamMember(createTaskDetails:CreateTeamMember) {
    const newTeamMember=this.teamMemberRepository.create({
        ...createTaskDetails,
        
    });
    return this.teamMemberRepository.save(newTeamMember);
  }
  fetchTasks() {
    return this.taskRepository.find({})
  }
  /* createTasks(createTaskDetails:CreateTaskParams) {
    const newTasks=this.taskRepository.create({
        ...createTaskDetails,
        
    });
    return this.taskRepository.save(newTasks);
  } */
  async createTasks(
    id: number,
    createTaskDetails: CreateTaskParams,
  ) {
    const member = await this.teamMemberRepository.findOneBy({ id });
    if (!member)
      throw new HttpException(
        'User not found. Cannot create Profile',
        HttpStatus.BAD_REQUEST,
      );
    const newPost = this.taskRepository.create({
      ...createTaskDetails,
      member,
    });
    return this.taskRepository.save(newPost);
  }
  updateTaskById(id:number,UpdateTaskDetails:UpdateTaskParams){
    this.taskRepository.update({id},{...UpdateTaskDetails})
  }
  deleteTaskById(id:number){
    return this.taskRepository.delete({id})
  }
}
