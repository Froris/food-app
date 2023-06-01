import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import { Dish } from '../features/restaurantsMenu/types';
import { useState } from 'react';

export const DishCard = ({ dishItem }: { dishItem: Dish }) => {
  const [isAdded, setIsAdded] = useState(false);

  return (
    <Card
      sx={{
        width: 240,
        height: 345,
        display: 'flex',
        flexDirection: 'column',
      }}
      elevation={5}
    >
      <CardMedia
        sx={{ height: 140 }}
        image={dishItem.image}
        title='green iguana'
      />
      <CardContent>
        <Box display='flex' alignItems='center' columnGap={1}>
          <Typography gutterBottom variant='h5' component='p'>
            {dishItem.name}
          </Typography>

          <Typography gutterBottom variant='h5' component='p'>
            {`$${dishItem.price}`}
          </Typography>
        </Box>

        <Typography variant='body2' color='text.secondary'>
          {dishItem.description && dishItem.description}
        </Typography>
      </CardContent>
      <CardActions sx={{ mt: 'auto' }}>
        {isAdded ? (
          <Box display='flex' alignItems='center' columnGap={1}>
            <DoneOutlineRoundedIcon color='success' />
            <Typography color='success' variant='subtitle1' component='p'>
              added to cart!
            </Typography>
          </Box>
        ) : (
          <Button
            data-dish={JSON.stringify(dishItem)}
            className='dish-item-btn'
            onClick={() => setIsAdded(true)}
            variant='contained'
            size='small'
          >
            <AddRoundedIcon />
            <Typography variant='subtitle1' component='p'>
              order
            </Typography>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
