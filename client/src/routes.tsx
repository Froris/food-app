import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { Main } from './pages/Main';
import { Cart } from './features/cart/Cart';
import { History } from './pages/History';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'history',
        element: <History />,
      },
    ],
  },
]);
