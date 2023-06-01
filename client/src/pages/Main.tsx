import { Box, Container, Divider } from '@mui/material';
import { useState } from 'react';
import { RestaurantsList } from '../features/restaurants/RestaurantsList';
import { RestaurantsMenu } from '../features/restaurantsMenu/RestaurantsMenu';
import { RestaurantNames } from '../features/restaurantsMenu/types';

export const Main = () => {
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantNames>(null);

  return (
    <Container maxWidth='xl' component='main'>
      <Box py={5} display='flex'>
        <RestaurantsList
          selectedRestaurant={selectedRestaurant}
          onListItemClick={setSelectedRestaurant}
        />
        <Divider orientation='vertical' variant='middle' flexItem />
        <RestaurantsMenu
          restaurant={selectedRestaurant}
          onCancelSelect={setSelectedRestaurant}
        />
      </Box>
    </Container>
  );
};
