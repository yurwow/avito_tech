import { Box, Chip, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { CardContentTask } from '@/widgets/CardContentTask';
import { EmptyTaskBoard } from '@/widgets/EmptyTaskBoard';
import { useParams } from 'react-router';
import { Loading } from '@/shared/ui/Loading';
import { ITask } from '@/entities/Task/model/types/ITask.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { openTaskModal } from '@/features/taskModal/taskModalSlice.ts';
import { useGetTasksQuery } from '@/shared/api/IssueApi.ts';
import { TaskFormValues } from '@/widgets/TaskForm/ui/TaskForm.tsx';

const columns = [
    { id: 'backlog', title: 'Нужно сделать', color: '#2196f3' },
    { id: 'inProgress', title: 'В процессе', color: '#ff9800' },
    { id: 'done', title: 'Сделано', color: '#4caf50' },
];

type TaskColumnType = keyof IState;

export interface IState {
    backlog: ITask[];
    inProgress: ITask[];
    done: ITask[];
}

const mapTaskToFormValues = (task: ITask, boardId: number): TaskFormValues & { id: number } => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status,
    boardId,
    assignee: task.assignee ? {
        id: task.assignee.id,
        fullName: task.assignee.fullName,
        email: task.assignee.email,
        avatarUrl: task.assignee.avatarUrl
    } : undefined,
    assigneeId: task.assignee?.id ?? ''
});

export const KanbanBoard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tasks, setTasks] = useState<IState | undefined>({ backlog: [], inProgress: [], done: [] });
    const { id } = useParams();
    const { data, isLoading } = useGetTasksQuery(id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const tasksArray = data?.data;

        if (tasksArray && Array.isArray(tasksArray)) {
            const newTasks: IState = {
                backlog: [],
                inProgress: [],
                done: [],
            };

            tasksArray.forEach((task) => {
                const status = task.status.toLowerCase().replace(/\s+/g, '');

                if (status === 'backlog') {
                    newTasks.backlog.push(task);
                } else if (status === 'inprogress') {
                    newTasks.inProgress.push(task);
                } else if (status === 'done') {
                    newTasks.done.push(task);
                }
            });

            setTasks(newTasks);
        }
    }, [data]);

    if (isLoading) return <Loading />;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: 3,
                width: '100%',
                minHeight: '70vh',
            }}
        >
            {columns.map((column) => (
                <Paper
                    key={column.id}
                    elevation={0}
                    sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '12px',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        bgcolor: 'rgba(0, 0, 0, 0.01)',
                        overflow: 'hidden',
                        mb: isMobile ? 4 : 0,
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: 'white',
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: column.color,
                                    mr: 1.5,
                                }}
                            />
                            <Typography
                                variant="subtitle1"
                                sx={{
                                    fontWeight: 600,
                                    color: '#424242',
                                }}
                            >
                                {column.title}
                            </Typography>
                        </Box>

                        <Chip
                            label={tasks && tasks[column.id as TaskColumnType].length}
                            size="small"
                            sx={{
                                bgcolor: 'rgba(0, 0, 0, 0.04)',
                                fontWeight: 600,
                            }}
                        />
                    </Box>

                    <Box sx={{ p: 2, flexGrow: 1 }}>
                        {tasks &&
                            tasks[column.id as TaskColumnType].map((task) => (
                                <Fragment key={task.id}>
                                    <CardContentTask
                                        task={task}
                                        onClick={() => dispatch(openTaskModal(mapTaskToFormValues(task, Number(id))))}
                                    />
                                </Fragment>
                            ))}

                        {tasks && tasks[column.id as TaskColumnType].length === 0 && <EmptyTaskBoard />}
                    </Box>
                </Paper>
            ))}
        </Box>
    );
};
