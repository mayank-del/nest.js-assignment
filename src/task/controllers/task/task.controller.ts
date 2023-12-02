import {
  Req,
  Res,
  Param,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Delete
} from '@nestjs/common';
import {Request,Response} from "express";
import { TaskService } from 'src/task/services/task/task.service';
import { CreateTaskDto } from '../../dtos/CreateTask.dto';
import { UpdateTaskDto } from 'src/task/dtos/UpdateUser.dto';
import { CreateTeam, CreateTeamMember } from 'src/types/types';

@Controller('api')
export class TaskController {
  constructor(private taskService: TaskService) {}
  @Post('/login')
  fetchTeamTem(@Body() BodyData: CreateTeamMember) {
    return this.taskService.login(BodyData);
  }
  @Post('/create/team')
  createNewTeam(@Body() createTeamDto: CreateTeam) {
    this.taskService.createTeam(createTeamDto);
  }
  @Get('/teams')
  getAllTeamMembers() {
    return this.taskService.fetchTeams();
  }
  @Get('/tasks')
  getAllTask() {
    return this.taskService.fetchTasks();
  }
  @Get('/team/tasks/:id')
  getTasksOfAMember(
    @Param('id', ParseIntPipe) id: number,
  ) {
    
    return this.taskService.fetchTasksById(id);
  }
  @Post(':id/add/team_member')
  async createTeamMem(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTeamMemberDto: CreateTeamMember,
    @Res() res: Response
  ) {
    const status= await this.taskService.createTeamMember(id, createTeamMemberDto);
    if ('status' in status) {
      return res.status(status.status).json({ message: status.message });
    }
    return { message: status };
  }

  @Post('/taskapi/tasks')
  async createNewTask(
    //@Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
   @Req() req: Request
   
  ) {
    const uid:number=req["tokenData"]["id"]
    //const membername:string=req["tokenData"]["uname"]
    //console.log(membername);
    
    const createdTask = await this.taskService.createTasks(uid, createTaskDto);
    return { message: 'Task created successfully', task: createdTask };
  }

  @Patch('/taskapi/tasks/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Res() res: Response
  ) {
    const status= await this.taskService.updateTaskById(id, updateTaskDto);
    if ('status' in status) {
      return res.status(status.status).json({ message: status.message });
    }
    return { message: status };
  }
  @Delete('/taskapi/tasks/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number,@Res() res: Response) {
    
    const status=await this.taskService.deleteTaskById(id);
    if ('status' in status) {
      return res.status(status.status).json({ message: status.message });
    }
    return { message: status };
  }
}
