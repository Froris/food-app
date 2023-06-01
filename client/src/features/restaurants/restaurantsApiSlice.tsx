import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RestaurantList } from './types';
import { baseUrl } from '../../constants';

export const restaurantListApi = createApi({
  reducerPath: 'restaurantListApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getRestaurantsList: builder.query<RestaurantList, null>({
      query: () => `/restaurants`,
    }),
  }),
});

export const { useGetRestaurantsListQuery } = restaurantListApi;
