import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { restaurantListApi } from './features/restaurants/restaurantsApiSlice';
import { restaurantMenuApi } from './features/restaurantsMenu/restaurantsMenuApiSlice';
import cartReducer from './features/cart/cartSlice';
import { historyApiSlice } from './features/history/historyApiSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  [restaurantListApi.reducerPath]: restaurantListApi.reducer,
  [restaurantMenuApi.reducerPath]: restaurantMenuApi.reducer,
  [historyApiSlice.reducerPath]: historyApiSlice.reducer,
});

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        restaurantListApi.middleware,
        restaurantMenuApi.middleware,
        historyApiSlice.middleware
      ),
  });

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
