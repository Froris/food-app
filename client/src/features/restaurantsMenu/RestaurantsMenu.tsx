import { Box, Button, Divider, Typography } from '@mui/material';
import { SyntheticEvent } from 'react';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { DishCard } from '../../components/DishCard';
import { useGetRestaurantMenuQuery } from './restaurantsMenuApiSlice';
import { Dish, RestaurantNames } from './types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from '../../hooks/storeHooks';
import { addToCart, resetCart } from '../cart/cartSlice';
import { LoadingSpinner } from '../../components/LoadingSpinner';

const Dishes = ({ dishes }: { dishes: Dish[] }) => {
  return (
    <Box mt={2} display='flex' flexWrap='wrap' component='article' gap={2}>
      {dishes.map((dish) => (
        <DishCard key={dish.name} dishItem={dish} />
      ))}
    </Box>
  );
};

export const RestaurantsMenu = ({
  restaurant,
  onCancelSelect,
}: {
  onCancelSelect: (value: RestaurantNames) => void;
  restaurant: RestaurantNames | undefined;
}) => {
  const dispatch = useAppDispatch();
  const {
    data: restaurantMenu,
    isFetching,
    isSuccess,
  } = useGetRestaurantMenuQuery(restaurant ?? skipToken);

  function handleCancelSelect() {
    onCancelSelect(null);
    dispatch(resetCart());
  }

  const addOrder = (event: SyntheticEvent) => {
    const target = event.target as HTMLElement;
    const btnElement = target.closest('.dish-item-btn');

    if (btnElement instanceof HTMLElement) {
      const dataSetValue = btnElement.dataset.dish;

      if (dataSetValue !== undefined) {
        const parsedData: Dish = JSON.parse(dataSetValue);
        dispatch(addToCart(parsedData));
      }
    }
  };

  return (
    <Box
      component='section'
      pl={5}
      pb={2}
      sx={{
        width: '100%',
        height: 'calc(100vh - 144px)',
        overflowY: 'auto',
      }}
    >
      <>
        <LoadingSpinner isLoading={isFetching} />
        {!restaurantMenu ||
          (!restaurant && (
            <Box display='flex' alignItems='center' columnGap={2}>
              <KeyboardBackspaceRoundedIcon fontSize='large' />
              <Typography variant='h4' component='p'>
                Please select restaurant!
              </Typography>
            </Box>
          ))}
        {isSuccess && (
          <Box component='article' width='100%' onClick={(e) => addOrder(e)}>
            <Box
              p={1}
              columnGap={2}
              sx={{ backgroundColor: restaurantMenu.mainColor }}
            >
              <Typography variant='h4' component='h2' color='white'>
                {restaurantMenu.name} menu
              </Typography>
              <Button
                variant='contained'
                color='info'
                onClick={handleCancelSelect}
              >
                Select another?
              </Button>
            </Box>
            <Box component='section' mt={5}>
              <Divider textAlign='left'>
                <Typography variant='h6' component='h3'>
                  Main Dishes
                </Typography>
              </Divider>
              <Dishes dishes={restaurantMenu.menu.mainDishes} />
            </Box>
            <Box component='section' mt={5}>
              <Divider textAlign='left'>
                <Typography variant='h6' component='h3'>
                  Deserts
                </Typography>
              </Divider>
              <Dishes dishes={restaurantMenu.menu.desserts} />
            </Box>
            <Box component='section' mt={5}>
              <Divider textAlign='left'>
                <Typography variant='h6' component='h3'>
                  Drinks
                </Typography>
              </Divider>
              <Dishes dishes={restaurantMenu.menu.drinks} />
            </Box>
          </Box>
        )}
      </>
    </Box>
  );
};
