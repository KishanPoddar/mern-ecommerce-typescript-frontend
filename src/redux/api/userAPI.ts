import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import {
    AllUsersResponse,
    DeleteUserRequest,
    MessageResponse,
    UserResponse,
} from "../../types/api-types";
import { User } from "../../types/types";

const server = import.meta.env.VITE_SERVER;

export const userAPI = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user/` }),
    tagTypes: ["users"],
    endpoints: (builder) => ({
        login: builder.mutation<MessageResponse, User>({
            query: (user) => ({
                url: "new",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation<MessageResponse, DeleteUserRequest>({
            query: ({ userId, adminUserId }) => ({
                url: `${userId}?id=${adminUserId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["users"],
        }),
        allUsers: builder.query<AllUsersResponse, string>({
            query: (id) => `all?id=${id}`,
            providesTags: ["users"],
        }),
    }),
});

export const getUser = async (id: string) => {
    const { data }: { data: UserResponse } = await axios.get(
        `${server}/api/v1/user/${id}`
    );
    return data;
};

export const { useLoginMutation, useDeleteUserMutation, useAllUsersQuery } =
    userAPI;
