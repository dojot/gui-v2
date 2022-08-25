import { createTheme } from '@material-ui/core';

const light = createTheme({
  palette: {
    primary: {
      light: '#002e99',
      main: '#00226f',
      dark: '#00174d',
    },
    secondary: {
      light: '#258e85',
      main: '#1b6a63',
      dark: '#15514c',
    },
    success: {
      light: '#98e69c',
      main: '#78de7d',
      dark: '#5bd761',
    },
    info: {
      light: '#b3d4ff',
      main: '#85baff',
      dark: '#66a8ff',
    },
    warning: {
      light: '#ffe999',
      main: '#ffdf6b',
      dark: '#ffd84d',
    },
    error: {
      light: '#ff9e99',
      main: '#ff807a',
      dark: '#ff554d',
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
