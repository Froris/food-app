import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Badge,
  Button,
  Divider,
} from '@mui/material';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import FastfoodRoundedIcon from '@mui/icons-material/FastfoodRounded';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/storeHooks';
import { selectTotalAmount } from '../features/cart/cartSlice';
import LowPriorityRoundedIcon from '@mui/icons-material/LowPriorityRounded';

export const AppNavbar = () => {
  const navigate = useNavigate();
  const totalAmount = useAppSelector((state) => selectTotalAmount(state));

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar>
          <Box
            display='flex'
            alignItems='center'
            onClick={() => navigate('/')}
            sx={{ cursor: 'pointer' }}
          >
            <FastfoodRoundedIcon fontSize='large' />
            <Typography variant='h4' noWrap>
              FoodApp
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <Button onClick={() => navigate('/cart')} color='inherit'>
              <Typography variant='subtitle1' noWrap>
                Shopping cart
              </Typography>
              <Badge badgeContent={totalAmount} color='secondary'>
                <ShoppingCartRoundedIcon fontSize='large' />
              </Badge>
            </Button>
          </Box>
          <Divider orientation='vertical' flexItem sx={{ mx: 2 }} />
          <Box>
            <Button onClick={() => navigate('/history')} color='inherit'>
              <Typography variant='subtitle1' noWrap>
                Orders history
              </Typography>

              <LowPriorityRoundedIcon fontSize='large' />
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
