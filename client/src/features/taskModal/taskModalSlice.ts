import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskFormValues } from '@/widgets/TaskForm/ui/TaskForm.tsx';

interface TaskModalState {
    isOpen: boolean;
    task: (TaskFormValues & { id: number }) | null;
    source: 'create' | 'edit' | '';
}

const initialState: TaskModalState = {
    isOpen: false,
    task: null,
    source: '',
};

const taskModalSlice = createSlice({
    name: 'taskModal',
    initialState,
    reducers: {
        openTaskModal: (
            state,
            action: PayloadAction<{ task: (TaskFormValues & { id: number }) | null; source: 'create' | 'edit' | '' }>,
        ) => {
            state.isOpen = true;
            state.task = action.payload.task;
            state.source = action.payload.source;
        },
        closeTaskModal: (state) => {
            state.isOpen = false;
            state.task = null;
            state.source = '';
        },
    },
});

export const { openTaskModal, closeTaskModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
