import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskFormValues } from '@/widgets/TaskForm/ui/TaskForm.tsx';

interface TaskModalState {
    isOpen: boolean;
    task: (TaskFormValues & { id: number }) | null;
}

const initialState: TaskModalState = {
    isOpen: false,
    task: null,
};

const taskModalSlice = createSlice({
    name: 'taskModal',
    initialState,
    reducers: {
        openTaskModal: (state, action: PayloadAction<(TaskFormValues & { id: number }) | null>) => {
            state.isOpen = true;
            state.task = action.payload;
        },
        closeTaskModal: (state) => {
            state.isOpen = false;
            state.task = null;
        },
    },
});

export const { openTaskModal, closeTaskModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
