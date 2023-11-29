//import {Body,Controller,get,Post} from 


//@Controller('tasks')
export class UpdateTaskDto{
    description:string;
    due_date:Date;
    assignee:string;
    status:string;
}