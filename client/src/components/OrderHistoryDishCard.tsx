import { Card, CardMedia, CardContent, Box, Typography } from '@mui/material';
import { OrderHistoryDish } from '../features/history/types';

export const OrderHistoryDishCard = ({ dish }: { dish: OrderHistoryDish }) => {
  return (
    <Card
      sx={{
        width: 240,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={5}
    >
      <CardMedia sx={{ height: 140 }} image={dish.image} title='green iguana' />
      <CardContent>
        <Box display='flex' alignItems='center' columnGap={1}>
          <Typography gutterBottom variant='h5' component='p'>
            {dish.name}
          </Typography>

          <Typography gutterBottom variant='h5' component='p'>
            {`$${dish.price}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
