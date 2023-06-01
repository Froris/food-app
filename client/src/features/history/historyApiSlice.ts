import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ClientOrderHistory } from './types';
import { baseUrl } from '../../constants';

export const historyApiSlice = createApi({
  reducerPath: 'historyApiSlice',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getClientOrdersHistory: builder.query<ClientOrderHistory, string>({
      query: (searchBy) => `/orders-history/${searchBy}`,
    }),
  }),
});

export const { useGetClientOrdersHistoryQuery } = historyApiSlice;
