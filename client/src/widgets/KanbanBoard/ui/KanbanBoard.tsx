import { Box, Chip, Paper, Typography, useMediaQuery, useTheme, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { CardContentTask } from '@/widgets/CardContentTask';
import { EmptyTaskBoard } from '@/widgets/EmptyTaskBoard';
import { useParams } from 'react-router';
import { ITask } from '@/entities/Task/model/types/ITask.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { openTaskModal } from '@/features/taskModal/taskModalSlice.ts';
import { useGetTasksQuery, useUpdateStatusTaskMutation } from '@/shared/api/IssueApi.ts';
import { TaskFormValues } from '@/widgets/TaskForm/ui/TaskForm.tsx';

import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

const columns = [
    { id: 'Backlog', title: 'Нужно сделать', color: '#2196f3', bgColor: 'rgba(33, 150, 243, 0.1)' },
    { id: 'InProgress', title: 'В процессе', color: '#ff9800', bgColor: 'rgba(255, 152, 0, 0.1)' },
    { id: 'Done', title: 'Сделано', color: '#4caf50', bgColor: 'rgba(76, 175, 80, 0.1)' },
];

type TaskColumnType = keyof IState;

export interface IState {
    Backlog: ITask[];
    InProgress: ITask[];
    Done: ITask[];
}

const mapTaskToFormValues = (task: ITask, boardId: number): TaskFormValues & { id: number } => ({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
    status: task.status as 'Backlog' | 'InProgress' | 'Done',
    boardId,
    assigneeId: task.assignee?.id || undefined,
    assignee: task.assignee
        ? {
              id: task.assignee.id,
              fullName: task.assignee.fullName,
              email: task.assignee.email,
              avatarUrl: task.assignee.avatarUrl,
          }
        : undefined,
});

export const KanbanBoard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [tasks, setTasks] = useState<IState>({
        Backlog: [],
        InProgress: [],
        Done: [],
    });

    const { id } = useParams();
    const { data, isLoading } = useGetTasksQuery(id);
    const dispatch = useAppDispatch();
    const [updateStatusTask] = useUpdateStatusTaskMutation();

    useEffect(() => {
        const tasksArray = data?.data;

        if (tasksArray && Array.isArray(tasksArray)) {
            const newTasks: IState = {
                Backlog: [],
                InProgress: [],
                Done: [],
            };

            tasksArray.forEach((task) => {
                switch (task.status) {
                    case 'Backlog':
                        newTasks.Backlog.push(task);
                        break;
                    case 'InProgress':
                        newTasks.InProgress.push(task);
                        break;
                    case 'Done':
                        newTasks.Done.push(task);
                        break;
                    default:
                        console.warn('Unknown task status:', task.status);
                }
            });

            setTasks(newTasks);
        }
    }, [data]);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination || !tasks) return;

        const sourceColumn = source.droppableId as TaskColumnType;
        const destColumn = destination.droppableId as TaskColumnType;

        if (sourceColumn === destColumn && source.index === destination.index) return;

        const sourceTasks = Array.from(tasks[sourceColumn]);
        const destTasks = Array.from(tasks[destColumn]);

        const [movedTask] = sourceTasks.splice(source.index, 1);
        const updatedTask = { ...movedTask, status: destColumn };

        destTasks.splice(destination.index, 0, updatedTask);

        const newState = {
            ...tasks,
            [sourceColumn]: sourceTasks,
            [destColumn]: destTasks,
        };

        setTasks(newState);

        updateStatusTask({
            id: movedTask.id,
            status: destColumn,
        }).catch((err) => {
            console.error('Ошибка при обновлении статуса:', err);
            setTasks(tasks);
        });
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 4,
                    width: '100%',
                    minHeight: '70vh',
                    p: 3,
                    bgcolor: 'background.default',
                }}
            >
                {[...Array(3)].map((_, idx) => (
                    <Paper
                        key={idx}
                        elevation={2}
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            borderRadius: '16px',
                            border: '1px solid rgba(0, 0, 0, 0.08)',
                            bgcolor: 'white',
                            overflow: 'hidden',
                            mb: isMobile ? 4 : 0,
                            p: 2,
                        }}
                    >
                        <Skeleton variant="rectangular" height={40} sx={{ mb: 2, borderRadius: '8px' }} />

                        <Box sx={{ flexGrow: 1 }}>
                            {[...Array(3)].map((_, taskIdx) => (
                                <Skeleton
                                    key={taskIdx}
                                    variant="rounded"
                                    height={80}
                                    sx={{ mb: 2, borderRadius: '12px' }}
                                />
                            ))}
                        </Box>
                    </Paper>
                ))}
            </Box>
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 4,
                    width: '100%',
                    minHeight: '70vh',
                    p: 3,
                    bgcolor: 'background.default',
                }}
            >
                {columns.map((column) => (
                    <Droppable droppableId={column.id} key={column.id}>
                        {(provided) => (
                            <Paper
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                elevation={2}
                                sx={{
                                    flex: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(0, 0, 0, 0.08)',
                                    bgcolor: 'white',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    },
                                    mb: isMobile ? 4 : 0,
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 2.5,
                                        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        bgcolor: column.bgColor,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                        <Box
                                            sx={{
                                                width: 12,
                                                height: 12,
                                                borderRadius: '50%',
                                                bgcolor: column.color,
                                            }}
                                        />
                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'text.primary',
                                                fontSize: '1.1rem',
                                            }}
                                        >
                                            {column.title}
                                        </Typography>
                                    </Box>

                                    <Chip
                                        label={tasks[column.id as TaskColumnType].length}
                                        size="small"
                                        sx={{
                                            bgcolor: 'rgba(0, 0, 0, 0.04)',
                                            fontWeight: 600,
                                            color: 'text.secondary',
                                        }}
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        p: 2,
                                        flexGrow: 1,
                                        minHeight: 100,
                                        bgcolor: 'rgba(0, 0, 0, 0.01)',
                                        transition: 'background-color 0.2s ease-in-out',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.02)',
                                        },
                                    }}
                                >
                                    {tasks[column.id as TaskColumnType].map((task, index) => (
                                        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={{
                                                        marginBottom: 12,
                                                        ...provided.draggableProps.style,
                                                    }}
                                                >
                                                    <CardContentTask
                                                        task={task}
                                                        onClick={() =>
                                                            dispatch(
                                                                openTaskModal({
                                                                    task: mapTaskToFormValues(task, Number(id)),
                                                                    source: 'edit',
                                                                }),
                                                            )
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}

                                    {tasks[column.id as TaskColumnType].length === 0 && <EmptyTaskBoard />}

                                    {provided.placeholder}
                                </Box>
                            </Paper>
                        )}
                    </Droppable>
                ))}
            </Box>
        </DragDropContext>
    );
};
