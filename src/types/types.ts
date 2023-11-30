export type CreateTaskParams = {

    description:string;
    due_date:Date;
    assignee:string;
    status:string;
};

export type UpdateTaskParams = {

    description:string;
    due_date:Date;
    assignee:string;
    status:string;
};

export type CreateTeamMember={
    member_name: string;
    password: string;
}

export type CreateTeam={
    team_name: string;
    
}