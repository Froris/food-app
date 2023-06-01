import { Outlet } from 'react-router-dom';
import { AppNavbar } from './components/AppNavbar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNavbar />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
