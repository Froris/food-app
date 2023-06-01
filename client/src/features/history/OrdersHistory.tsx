import { Typography, Box } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { useGetClientOrdersHistoryQuery } from './historyApiSlice';
import { OrderHistoryDetails } from '../../components/OrderHistoryDetails';

export const OrdersHistory = ({ inputValue }: { inputValue: string }) => {
  const {
    data: ordersHistory,
    isFetching,
    isSuccess,
  } = useGetClientOrdersHistoryQuery(
    inputValue.length === 0 ? skipToken : inputValue
  );

  return (
    <>
      {isSuccess && !isFetching ? (
        <>
          <Typography m='0 auto 10px 10px' variant='h5' component='p'>
            Total spent: ${ordersHistory.totalPrice}
          </Typography>
          <Box p={2} component='section' sx={{ flex: 1, overflowY: 'auto' }}>
            {ordersHistory._id ? (
              ordersHistory.orders.map((order) => (
                <OrderHistoryDetails order={order} />
              ))
            ) : (
              <Typography variant='h4' component='p'>
                Client not found...
              </Typography>
            )}
          </Box>
        </>
      ) : (
        <LoadingSpinner isLoading={isFetching} />
      )}
    </>
  );
};
