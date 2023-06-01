import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Restaurant, RestaurantNames } from './types';
import { baseUrl } from '../../constants';

export const restaurantMenuApi = createApi({
  reducerPath: 'restaurantMenuApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRestaurantMenu: builder.query<Restaurant, RestaurantNames>({
      query: (restaurantName) => `/menu/${restaurantName}`,
    }),
  }),
});

export const { useGetRestaurantMenuQuery } = restaurantMenuApi;
