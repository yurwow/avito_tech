import { Button } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { TaskForm } from '@/widgets/TaskForm';
import { useAppDispatch } from '@/app/providers/StoreProvider/lib/hooks/useAppDispatch.ts';
import { openTaskModal } from '@/features/taskModal/taskModalSlice.ts';

export const CreateTaskButton = () => {
    const dispatch = useAppDispatch();

    const handleCreateTask = () => {
        dispatch(openTaskModal({ task: null, source: 'create' }));
    };

    return (
        <>
            <Button
                onClick={handleCreateTask}
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                    bgcolor: 'white',
                    color: '#1565c0',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    '&:hover': {
                        bgcolor: '#f5f5f5',
                        boxShadow: '0 6px 10px rgba(0,0,0,0.15)',
                    },
                }}
            >
                Создать задачу
            </Button>
            <TaskForm />
        </>
    );
};
