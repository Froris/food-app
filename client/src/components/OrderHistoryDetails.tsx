import { OrdersHistoryDetails } from '../features/history/types';
import { OrderHistoryDishCard } from './OrderHistoryDishCard';
import { Box, Typography } from '@mui/material';

export const OrderHistoryDetails = ({
  order,
}: {
  order: OrdersHistoryDetails;
}) => {
  return (
    <Box
      my={1}
      p={2}
      display='flex'
      alignItems='flex-start'
      columnGap={1}
      rowGap={2}
      sx={{
        border: '1px solid #E57C23',
        borderRadius: '10px',
      }}
    >
      <Box
        p={1}
        width={'100%'}
        maxWidth={1000}
        height={260}
        display='flex'
        flexWrap='wrap'
        gap={2}
        sx={{ overflowY: 'auto' }}
      >
        {order.dishesList.map((dish, index) => (
          <OrderHistoryDishCard key={index} dish={dish} />
        ))}
      </Box>
      <Typography mx='auto' variant='h5' component='p'>
        Order price: ${order.totalOrderPrice}
      </Typography>
    </Box>
  );
};
