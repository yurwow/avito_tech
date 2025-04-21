import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from '@/shared/api/projectsApi.ts';
import { issueApi } from '@/shared/api/IssueApi.ts';
import { usersApi } from '@/shared/api/usersApi';
import taskModalReducer from '@/features/taskModal/taskModalSlice.ts';

const store = configureStore({
    reducer: {
        taskModal: taskModalReducer,
        [projectsApi.reducerPath]: projectsApi.reducer,
        [issueApi.reducerPath]: issueApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(projectsApi.middleware, issueApi.middleware, usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
