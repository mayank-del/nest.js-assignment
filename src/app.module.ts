import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './typeorm/entities/Task';
import { TasksModule } from './task/tasks.module';
import { TaskController } from './task/controllers/task/task.controller';
import { TaskService } from './task/services/task/task.service';
import { Team_member } from './typeorm/entities/Team_member';
import { Team } from './typeorm/entities/Team';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'pract',
      entities: [Task,Team_member,Team],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
