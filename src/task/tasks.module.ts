import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './controllers/task/task.controller';
import { TaskService } from './services/task/task.service';
import { Task } from '../typeorm/entities/Task';
import { Team_member } from 'src/typeorm/entities/Team_member';
import { Team } from 'src/typeorm/entities/Team';

@Module({
  imports: [TypeOrmModule.forFeature([Task,Team_member,Team])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TasksModule {}
