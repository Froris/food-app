import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { CartForm } from '../../components/CartForm';
import { useState, useEffect, ChangeEvent } from 'react';
import { OrdersList } from '../../components/OrdersList';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { resetCart, selectOrders, selectTotalPrice } from './cartSlice';
import { useSendOrderDataMutation } from './cartApiSlice';
import { useNavigate } from 'react-router-dom';

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export const Cart = () => {
  const [sendOrderData, result] = useSendOrderDataMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => selectOrders(state));
  const totalPrice = useAppSelector((state) => selectTotalPrice(state));

  const [customer, setCustomer] = useState<Customer>({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newCustomer = {
      ...customer,
      [name]: value,
    };

    setCustomer(newCustomer);
  };

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const newOrder = {
      client: { ...customer },
      orders: orders,
      totalPrice,
    };

    sendOrderData(newOrder);
  }

  function handleEmptyCart() {
    dispatch(resetCart());
  }

  useEffect(() => {
    if (result.status === 'fulfilled') {
      alert(
        'Your order has been successfully placed! Expect a call from the courier.'
      );
      dispatch(resetCart());
      navigate('/');
    }
  }, [result]);

  return (
    <Container maxWidth='xl' component='main'>
      <Box py={5} display='flex' justifyContent='space-evenly'>
        {!orders.length ? (
          <Typography variant='h4' component='p'>
            You haven't ordered anything yet...
          </Typography>
        ) : (
          <>
            <Box
              component='section'
              width='100%'
              maxWidth='600px'
              display='flex'
              flexDirection='column'
              rowGap={5}
            >
              <CartForm
                inputValues={customer}
                onInputChange={handleInputChange}
              />

              <Box
                display='flex'
                flexWrap='wrap'
                justifyContent='flex-start'
                gap={5}
              >
                <Typography variant='h4' component='p' width='100%'>
                  Total price: ${totalPrice}
                </Typography>
                <Button
                  disabled={!customer.phone.length || !customer.email.length}
                  type='submit'
                  variant='contained'
                  color='success'
                  onClick={handleSubmit}
                >
                  SUBMIT
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  color='error'
                  onClick={handleEmptyCart}
                >
                  empty the shopping cart
                </Button>
              </Box>
            </Box>

            <Divider
              orientation='vertical'
              variant='middle'
              flexItem
              sx={{
                mx: '20px',
              }}
            />
            <OrdersList ordersList={orders} />
          </>
        )}
      </Box>
    </Container>
  );
};
