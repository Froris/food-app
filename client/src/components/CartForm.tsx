import React, { ChangeEvent } from 'react';
import { Box, TextField } from '@mui/material';
import { Customer } from '../features/cart/Cart';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

interface CartFormProps {
  inputValues: Customer;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CartForm: React.FC<CartFormProps> = ({
  inputValues,
  onInputChange,
}) => {
  const { email, name, phone, address } = inputValues;

  return (
    <Box
      component='article'
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 5,
      }}
    >
      <TextField
        fullWidth
        label='Name'
        name='name'
        value={name}
        onChange={onInputChange}
      />
      <TextField
        required
        error={!!email && !emailRegex.test(email)}
        fullWidth
        label='Email'
        type='email'
        name='email'
        helperText={
          !!email && !emailRegex.test(email)
            ? 'Invalid email! Example: jon@mail.com'
            : ''
        }
        value={email}
        onChange={onInputChange}
      />
      <TextField
        required
        fullWidth
        label='Phone'
        type='number'
        name='phone'
        value={phone}
        onChange={onInputChange}
      />
      <TextField
        fullWidth
        label='Address'
        name='address'
        value={address}
        onChange={onInputChange}
      />
    </Box>
  );
};
