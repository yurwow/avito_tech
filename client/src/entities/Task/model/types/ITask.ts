export interface ITask {
    id: number;
    title: string;
    description: string;
    priority: 'Low' | 'Medium' | 'High' | '';
    status: 'Backlog' | 'InProgress' | 'Done' | '';
    assignee: {
        id: number;
        fullName: string;
        email: string;
        avatarUrl: string;
    };
    boardId?: number;
    assigneeId?: number;
}

export interface IExtendedTask extends ITask {
    boardId: number;
    boardName: string;
}
