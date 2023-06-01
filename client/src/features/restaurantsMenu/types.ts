export interface Dish {
  name: string;
  price: number;
  description?: string;
  image: string;
}

export interface Menu {
  drinks: Dish[];
  mainDishes: Dish[];
  desserts: Dish[];
}

export interface Restaurant {
  name: string;
  mainColor: string;
  menu: Menu;
}

export type RestaurantNames =
  | "McDonald's"
  | 'KFC'
  | 'Warburger'
  | 'Chelentano Pizza'
  | 'Sushiya'
  | null;
