import { Container } from '@mui/material';
import { useState } from 'react';
import { OrdersHistory } from '../features/history/OrdersHistory';
import { HistoryForm } from '../components/HistoryForm';

export const History = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <Container
      maxWidth='xl'
      component='main'
      sx={{
        py: 5,

        height: 'calc(100vh - 104px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HistoryForm inputValue={inputValue} onInputChange={setInputValue} />
      <OrdersHistory inputValue={inputValue} />
    </Container>
  );
};
