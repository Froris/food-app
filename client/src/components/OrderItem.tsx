import { Card, CardMedia } from '@mui/material';
import { Dish } from '../features/restaurantsMenu/types';

export const OrderItem = ({ dishItem }: { dishItem: Dish }) => {
  return (
    <Card
      sx={{
        p: 1,
        minWidth: 140,
        width: 240,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={5}
    >
      <CardMedia
        sx={{ height: '100%' }}
        image={dishItem.image}
        title='green iguana'
      />
    </Card>
  );
};
