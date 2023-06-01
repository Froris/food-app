import { Box, Divider, List, ListItem, Typography } from '@mui/material';
import { useGetRestaurantsListQuery } from './restaurantsApiSlice';
import { RestaurantNames } from '../restaurantsMenu/types';

const Restaurant = ({
  isDisabled,
  img,
  name,
  fontColor,
}: {
  isDisabled: boolean;
  img: string;
  name: string;
  fontColor: string;
}) => {
  return (
    <ListItem
      data-restaurant={isDisabled ? 'disabled' : name}
      sx={{
        ':hover': {
          outline: `5px solid ${fontColor}`,
          cursor: isDisabled ? 'not-allowed' : 'pointer',
        },
        mb: 3,
        mx: 1,
        width: '100%',
        maxWidth: '400px',
        height: '200px',

        opacity: isDisabled ? 0.5 : 1,

        background: `linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 60%,rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.8) 100%),  url(${img})`,
        backgroundSize: 'cover',
      }}
    >
      <Typography mt='auto' variant='h3' color={fontColor}>
        {name}
      </Typography>
    </ListItem>
  );
};

export const RestaurantsList = ({
  onListItemClick,
  selectedRestaurant,
}: {
  selectedRestaurant: RestaurantNames | undefined;
  onListItemClick: (value: RestaurantNames) => void;
}) => {
  const { data: restaurantList, isSuccess } = useGetRestaurantsListQuery(null);

  function handleListItemClick(event: React.SyntheticEvent) {
    const target = event.target as HTMLElement;
    if (target.matches('li, li h3')) {
      const liElement = target.closest('li');
      if (liElement instanceof HTMLElement) {
        const dataSetValue = liElement.dataset.restaurant;
        onListItemClick(dataSetValue as RestaurantNames);
      }
    }
  }

  return (
    <Box
      component='section'
      pr={'20px'}
      sx={{
        width: '100%',
        maxWidth: '420px',
        height: 'calc(100vh - 144px)',
        overflowY: 'auto',
      }}
    >
      <Typography variant='h4' component='h2'>
        Restaurants
      </Typography>
      <Divider />
      <List onClick={handleListItemClick} sx={{ mt: '20px' }}>
        {isSuccess &&
          restaurantList.map((restaurant) => (
            <Restaurant
              isDisabled={
                !!selectedRestaurant && selectedRestaurant !== restaurant.name
              }
              key={restaurant.name}
              img={restaurant.image}
              name={restaurant.name}
              fontColor={restaurant.mainColor}
            />
          ))}
      </List>
    </Box>
  );
};
