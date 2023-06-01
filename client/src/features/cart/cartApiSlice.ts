import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewOrder } from './types';
import { baseUrl } from '../../constants';

export const cartApiSlice = createApi({
  reducerPath: 'restaurantListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    sendOrderData: builder.mutation<any, NewOrder>({
      query: (data) => ({
        url: `/orders`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useSendOrderDataMutation } = cartApiSlice;
