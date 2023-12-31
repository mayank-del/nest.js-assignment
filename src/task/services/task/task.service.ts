import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../../typeorm/entities/Task';
import { Repository } from 'typeorm';
import { CreateTaskParams, UpdateTaskParams,CreateTeamMember,CreateTeam } from 'src/types/types';
import { Team_member } from 'src/typeorm/entities/Team_member';
import * as jwt from 'jsonwebtoken';
import { Team } from 'src/typeorm/entities/Team';
import {Response} from "express";
//import { UpdateTaskDto } from 'src/task/dtos/UpdateUser.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(Team_member) private teamMemberRepository: Repository<Team_member>,
    @InjectRepository(Team) private teamRepository: Repository<Team>,
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
  async createTeamMember(id: number, createTeamMemberDetails:CreateTeamMember) {
    const name_of_team = await this.teamRepository.findOneBy({ id });
    
    
    if (!name_of_team)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Team not found in database. First create team then add member',
      };
    const mem=await this.teamMemberRepository.findOneBy({member_name:createTeamMemberDetails.member_name})  
    if (mem)
      return {
        status: HttpStatus.CONFLICT,
        message: 'Member with this name already exists',
      };
    const newPost = this.teamMemberRepository.create({
      ...createTeamMemberDetails,
      name_of_team,
    });
    return this.teamMemberRepository.save(newPost);
    
  }
  fetchTasksById(id: number){
    let data=this.teamMemberRepository.findOne(
      {
        relations:["tasks","name_of_team"],
        where: { id },
        select: ["id","member_name"], // Specify the columns you want to retrieve
      }
    );
    return data;
  }
  fetchTasks() {
    return this.taskRepository.find({})
  }
  fetchTeams(){
    return this.teamRepository.find({relations:["members"]})
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
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'User not found. Cannot create Task',
    };
      /* throw new HttpException(
        'User not found. Cannot create Task',
        HttpStatus.BAD_REQUEST,
      ); */
    const newPost = this.taskRepository.create({
      ...createTaskDetails,
      member,
    });
    return this.taskRepository.save(newPost);
  }

  async createTeam(createTeamDetails:CreateTeam){
    const newTeam=this.teamRepository.create({
      ...createTeamDetails,
      
  })
  return this.teamRepository.save(newTeam);
  }

  async updateTaskById(id:number,UpdateTaskDetails:UpdateTaskParams){
    const task = await this.taskRepository.findOneBy({ id });
    if(!task)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Task not found with that id. Cannot update Task',
      };
    return this.taskRepository.update({id},{...UpdateTaskDetails})
  }
  async deleteTaskById(id:number){
    /* console.log(req);
    let uid:number=req["id"] */
    const task = await this.taskRepository.findOneBy({ id });
    if(!task)
      return {
        status: HttpStatus.BAD_REQUEST,
        message: 'Task not found with that id. Cannot delete Task',
      };
    return this.taskRepository.delete({id})
  }
}
