export interface OrderHistoryDish {
  name: string;
  image: string;
  price: number;
  description: string;
  amount: number;
  orderId: string;
}

export interface OrdersHistoryDetails {
  dishesList: Array<OrderHistoryDish>;
  totalOrderPrice: number;
}

export interface ClientOrderHistory {
  _id: string;
  client: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  orders: Array<OrdersHistoryDetails>;
  totalPrice: number;
}
