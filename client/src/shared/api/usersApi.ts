import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser } from '@/entities/User/model/types.ts';

export interface UsersResponse {
    data: IUser[];
}

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8080/api/v1/' }),
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponse, void>({
            query: () => 'users',
        }),
    }),
});

export const { useGetUsersQuery } = usersApi;
