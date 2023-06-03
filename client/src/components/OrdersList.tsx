import {
  Box,
  Button,
  List,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
import { ChangeEvent, FocusEvent, memo } from 'react';
import { OrderItem } from './OrderItem';
import { OrderedDish } from '../features/cart/types';
import { useAppDispatch } from '../hooks/storeHooks';
import { changeAmount, removeFromCart } from '../features/cart/cartSlice';

export const OrdersList = memo(
  ({ ordersList }: { ordersList: OrderedDish[] }) => {
    const dispatch = useAppDispatch();

    function handleOnChange(
      e: ChangeEvent<HTMLInputElement>,
      item: OrderedDish
    ) {
      dispatch(
        changeAmount({
          orderId: item.orderId,
          amount: +e.target.value,
        })
      );
    }

    function handleOnBlur(e: FocusEvent<HTMLInputElement>, item: OrderedDish) {
      if (e.target.value === '' || +e.target.value <= 0) {
        dispatch(
          changeAmount({
            orderId: item.orderId,
            amount: 1,
          })
        );
      }
    }

    return (
      <Box
        component='section'
        sx={{
          width: '100%',
          height: 'calc(100vh - 144px)',
          overflowY: 'auto',
        }}
      >
        <List disablePadding>
          {ordersList.map((item) => (
            <ListItem key={item.orderId}>
              <Box display='flex' alignItems='center' columnGap={5}>
                <OrderItem dishItem={item} />
                <Box display='flex' flexDirection='column' rowGap={1}>
                  <Typography variant='h5' component='h3'>
                    {item.name}
                  </Typography>
                  <TextField
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleOnChange(e, item)
                    }
                    onBlur={(e: FocusEvent<HTMLInputElement>) =>
                      handleOnBlur(e, item)
                    }
                    value={item.amount <= 0 ? '' : item.amount}
                    id='outlined-number'
                    label='Amount'
                    type='number'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <Typography variant='h5' component='h3'>
                    Order price: ${item.totalOrderPrice}
                  </Typography>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={() => dispatch(removeFromCart(item.orderId))}
                  >
                    Remove
                  </Button>
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }
);
