import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { CartState } from './types';
import { Dish } from '../restaurantsMenu/types';
import { v4 as uuidv4 } from 'uuid';

const initialState: CartState = {
  orders: [],
  totalAmount: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Dish>) => {
      const newOrder: Dish = action.payload;
      const orderId = uuidv4();

      state.orders.push({
        ...newOrder,
        amount: 1,
        orderId,
        totalOrderPrice: action.payload.price,
      });
      state.totalPrice += newOrder.price;
      state.totalAmount++;
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(
        (item) => item.orderId !== action.payload
      );

      state.totalPrice = state.orders.reduce(
        (sum, dish) => sum + dish.price,
        0
      );
      state.totalAmount--;
    },

    changeAmount: (
      state,
      action: PayloadAction<{ orderId: string; amount: number }>
    ) => {
      const { amount, orderId } = action.payload;

      const order = state.orders.find((item) => item.orderId === orderId);

      if (order && amount >= 1) {
        const isAddAmount = amount > order.amount;

        order.amount = amount;
        order.totalOrderPrice = isAddAmount
          ? (order.totalOrderPrice += order.price)
          : (order.totalOrderPrice -= order.price);

        state.totalPrice = state.orders.reduce(
          (sum, dish) => sum + dish.totalOrderPrice,
          0
        );

        state.totalAmount = isAddAmount
          ? state.totalAmount++
          : state.totalAmount--;
      }
    },

    resetCart: (state) => {
      (state.orders = []), (state.totalAmount = 0), (state.totalPrice = 0);
    },
  },
});

export const { addToCart, removeFromCart, changeAmount, resetCart } =
  cartSlice.actions;

export const selectOrders = (state: RootState) => state.cart.orders;
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice;
export const selectTotalAmount = (state: RootState) => state.cart.totalAmount;

export default cartSlice.reducer;
