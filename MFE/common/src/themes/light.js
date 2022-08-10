import { createTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const light = createTheme({
  palette: {
    primary: {
      light: '#002e99',
      main: '#00226f',
      dark: '#00174d',
    },
    secondary: {
      main: '#19857b',
      light: '#21ab9d',
      dark: '#146b62',
    },
    error: {
      main: red.A400,
      light: red.A400,
      dark: red.A400,
    },
    background: {
      default: '#FAFAFA',
      shade: { 500: '#f2f2f2' },
      paper: '#FFF',
      login: '#dadde0',
    },
    table: {
      head: '#FFFFFF',
    },
    favorite: '#F1B44C',
  },

  overrides: {
    MuiButtonBase: {
      root: {
        verticalAlign: 'top',
      },
    },
  },
});

export default light;
