import {
  Param,
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
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
  createTeamMem(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTeamMemberDto: CreateTeamMember,
  ) {
    this.taskService.createTeamMember(id, createTeamMemberDto);
  }

  @Post(':id/tasks')
  async createNewTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const createdTask = await this.taskService.createTasks(id, createTaskDto);
    return { message: 'Task created successfully', task: createdTask };
  }

  @Patch(':id/tasks')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.taskService.updateTaskById(id, updateTaskDto);
    return { message: 'Task updated successfully' };
  }
  @Delete(':id/tasks')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTaskById(id);
    return { message: 'Task deleted successfully' };
  }
}
