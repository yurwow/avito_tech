import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useGetUsersQuery } from '@/shared/api/usersApi.ts';
import { useGetProjectsQuery } from '@/shared/api/projectsApi.ts';
import { useCreateTaskMutation, useUpdateTaskMutation } from '@/shared/api/IssueApi.ts';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { closeTaskModal } from '@/features/taskModal/taskModalSlice';
import { useAppSelector } from '@/app/providers/StoreProvider/lib/hooks/useAppSelector.ts';
import { RootState } from '@/app/providers/StoreProvider/config/store.ts';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export interface TaskFormValues {
    title: string;
    description: string;
    boardId: number;
    priority: 'Low' | 'Medium' | 'High' | '';
    status: 'Backlog' | 'InProgress' | 'Done' | '';
    assignee?: Assignee | null;
    assigneeId: number | undefined;
}

export interface Assignee {
    id: number;
    fullName: string;
    email: string;
    avatarUrl: string;
}

export const TaskForm = () => {
    const [createTask] = useCreateTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const dispatch = useAppDispatch();
    const { data: usersResponse } = useGetUsersQuery();
    const { data: boardsResponse } = useGetProjectsQuery();
    const assigneeOptions = usersResponse?.data || [];
    const boardsOptions = boardsResponse?.data || [];
    const { isOpen, task, source } = useAppSelector((state: RootState) => state.taskModal);

    const navigate = useNavigate();
    const location = useLocation();
    const isTasksPage = location.pathname === '/issues';

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: { isSubmitting },
    } = useForm<TaskFormValues>({
        defaultValues: {
            title: '',
            description: '',
            priority: '',
            status: '',
            assignee: null,
            boardId: boardsOptions[0]?.id || undefined,
        },
        mode: 'onBlur',
    });

    useEffect(() => {
        if (!task || source === 'create') return;

        if (boardsOptions.length && assigneeOptions.length) {
            reset({
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                assigneeId: task.assignee?.id ?? undefined,
                boardId: task.boardId || boardsOptions[0]?.id,
            });
        }
    }, [task, source, boardsOptions, assigneeOptions, reset]);

    const handleFormSubmit = (data: TaskFormValues) => {
        const assignee = data.assignee ? data.assignee : undefined;

        const payload = {
            ...data,
            assignee,
        };

        if (!task) {
            createTask(payload)
                .unwrap()
                .then(() => {
                    toast.success('Задача успешно создана!');
                    dispatch(closeTaskModal());
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Ошибка при создании задачи');
                });
        } else {
            updateTask({ id: task.id || 0, updatedTask: payload })
                .unwrap()
                .then(() => {
                    toast.success('Задача успешно обновлена!');
                    dispatch(closeTaskModal());
                })
                .catch((error) => {
                    console.error(error);
                    toast.error('Ошибка при обновлении задачи');
                });
        }
    };

    const handleClose = () => {
        dispatch(closeTaskModal());
        reset({
            title: '',
            description: '',
            priority: '',
            status: '',
            assignee: null,
            boardId: undefined,
            assigneeId: undefined,
        });
    };

    const boardId = watch('boardId');

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            sx={{
                '& .MuiDialogContent-root': {
                    maxHeight: '80vh',
                    overflowY: 'auto',
                },
            }}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        {task ? 'Редактировать задачу' : 'Создать задачу'}
                    </Typography>

                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: 'Название задачи обязательно' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Название задачи"
                                margin="normal"
                                error={!!fieldState?.error}
                                helperText={fieldState?.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="description"
                        control={control}
                        rules={{ required: 'Описание задачи обязательно' }}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Описание задачи"
                                margin="normal"
                                multiline
                                rows={4}
                                error={!!fieldState?.error}
                                helperText={fieldState?.error?.message}
                            />
                        )}
                    />

                    <Controller
                        name="boardId"
                        control={control}
                        rules={{ required: 'Доска обязательна' }}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal" error={!!fieldState?.error}>
                                <InputLabel>Доска</InputLabel>
                                <Select {...field} label="Доска">
                                    {boardsOptions.map((board) => (
                                        <MenuItem key={board.id} value={board.id}>
                                            {board.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="priority"
                        control={control}
                        rules={{ required: 'Приоритет обязателен' }}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal" error={!!fieldState?.error}>
                                <InputLabel>Приоритет</InputLabel>
                                <Select {...field} label="Приоритет">
                                    <MenuItem value="Low">Низкий</MenuItem>
                                    <MenuItem value="Medium">Средний</MenuItem>
                                    <MenuItem value="High">Высокий</MenuItem>
                                </Select>
                                <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="status"
                        control={control}
                        rules={{ required: 'Статус обязателен' }}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal" error={!!fieldState?.error}>
                                <InputLabel>Статус</InputLabel>
                                <Select {...field} label="Статус">
                                    <MenuItem value="Backlog">Нужно сделать</MenuItem>
                                    <MenuItem value="InProgress">В процессе</MenuItem>
                                    <MenuItem value="Done">Сделано</MenuItem>
                                </Select>
                                <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />

                    <Controller
                        name="assigneeId"
                        control={control}
                        rules={{ required: 'Исполнитель обязателен' }}
                        render={({ field, fieldState }) => (
                            <FormControl fullWidth margin="normal" error={!!fieldState?.error}>
                                <InputLabel>Исполнитель</InputLabel>
                                <Select {...field} label="Исполнитель">
                                    {assigneeOptions.map((assignee) => (
                                        <MenuItem key={assignee.id} value={assignee.id}>
                                            {assignee.fullName}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{fieldState?.error?.message}</FormHelperText>
                            </FormControl>
                        )}
                    />
                </DialogContent>

                <DialogActions
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingLeft: '25px',
                        paddingRight: '25px',
                    }}
                >
                    <Box>
                        {isTasksPage && source !== 'create' && (
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    dispatch(closeTaskModal());
                                    navigate(`/board/${boardId}`);
                                }}
                            >
                                Перейти на доску
                            </Button>
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button onClick={handleClose}>Отмена</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                            endIcon={isSubmitting ? <CircularProgress size={20} color="inherit" /> : null}
                        >
                            {task ? 'Обновить задачу' : 'Создать задачу'}
                        </Button>
                    </Box>
                </DialogActions>
            </form>
        </Dialog>
    );
};
