import { createTheme } from '@material-ui/core';
import red from '@material-ui/core/colors/red';

const light = createTheme({
  palette: {
    primary: {
      light: '#4788dc',
      main: '#4788dc',
      dark: '#4788dc',
    },
    secondary: {
      main: '#19857b',
      light: '#19857b',
      dark: '#19857b',
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
