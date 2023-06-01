import { Box, TextField, MenuItem } from '@mui/material';
import { useState, SyntheticEvent } from 'react';

const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export type SearchBy = 'email' | 'phone' | '';

export const HistoryForm = ({
  inputValue,
  onInputChange,
}: {
  inputValue: string;
  onInputChange: (value: string) => void;
}) => {
  const [searchBy, setSearchBy] = useState<SearchBy>('');

  function handleSearchByChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const searchByValue = targetElement.value as SearchBy;

    setSearchBy(searchByValue);
    onInputChange('');
  }

  function handleInputChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const value = targetElement.value;

    onInputChange(value);
  }

  return (
    <Box
      mb={5}
      component='section'
      sx={{
        width: '100%',
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        width='100%'
        maxWidth='700px'
        mx='auto'
        rowGap={5}
      >
        <TextField
          select
          id='search-by'
          label='Search By'
          value={searchBy}
          onChange={handleSearchByChange}
        >
          <MenuItem value='email'>Email</MenuItem>
          <MenuItem value='phone'>Phone</MenuItem>
        </TextField>
        {searchBy === 'email' && (
          <TextField
            id='email-input'
            error={!!inputValue && !emailRegex.test(inputValue)}
            fullWidth
            label='Email'
            type='email'
            helperText={
              !!inputValue && !emailRegex.test(inputValue)
                ? 'Invalid email! Example: jon@mail.com'
                : ''
            }
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
        {searchBy === 'phone' && (
          <TextField
            id='phone-input'
            fullWidth
            label='Phone'
            value={inputValue}
            onChange={handleInputChange}
          />
        )}
      </Box>
    </Box>
  );
};
