import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBoard } from '@/entities/Board/model/types/IBoard.ts';

export interface BoardsResponse {
    data: IBoard[];
}

export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/api/v1/' }),
    endpoints: (builder) => ({
        getProjects: builder.query<BoardsResponse, void>({
            query: () => 'boards',
        }),
    }),
});

export const { useGetProjectsQuery } = projectsApi;
