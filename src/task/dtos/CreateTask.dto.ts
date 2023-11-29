//import {Body,Controller,get,Post} from 


//@Controller('tasks')
export class CreateTaskDto{
    description:string;
    due_date:Date;
    assignee:string;
    status:string;
}