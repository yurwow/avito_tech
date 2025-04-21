import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IExtendedTask, ITask } from '@/entities/Task/model/types/ITask.ts';

export interface IssuesResponse {
    data: IExtendedTask[];
}

export const issueApi = createApi({
    reducerPath: 'issueApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/api/v1/' }),
    tagTypes: ['Tasks'],
    endpoints: (builder) => ({
        getTasks: builder.query<IssuesResponse, string | undefined>({
            query: (id) => `boards/${id}`,
            providesTags: ['Tasks'],
        }),
        getIssue: builder.query<IssuesResponse, void>({
            query: () => `tasks`,
            providesTags: ['Tasks'],
        }),
        getIssueById: builder.query<IssuesResponse, string | undefined>({
            query: (id) => `tasks/${id}`,
        }),
        createTask: builder.mutation<ITask, Partial<ITask>>({
            query: (newTask) => ({
                url: `tasks/create`,
                method: 'POST',
                body: newTask,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateTask: builder.mutation<ITask, { id: string | number; updatedTask: Partial<ITask> }>({
            query: ({ id, updatedTask }) => ({
                url: `tasks/update/${id}`,
                method: 'PUT',
                body: updatedTask,
            }),
            invalidatesTags: ['Tasks'],
        }),
        updateStatusTask: builder.mutation<ITask, { id: number | string; status: ITask['status'] }>({
            query: ({ id, status }) => ({
                url: `tasks/updateStatus/${id}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Tasks'],
        }),
    }),
});

export const {
    useGetTasksQuery,
    useGetIssueQuery,
    useGetIssueByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useUpdateStatusTaskMutation,
} = issueApi;
