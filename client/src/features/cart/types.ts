import { Dish } from '../restaurantsMenu/types';

export interface OrderedDish extends Dish {
  orderId: string;
  amount: number;
  totalOrderPrice: number;
}

export interface CartState {
  orders: OrderedDish[];
  totalPrice: number;
  totalAmount: number;
}

export interface NewOrder {
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orders: OrderedDish[];
  totalPrice: number;
}
