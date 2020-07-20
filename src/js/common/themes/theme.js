import red from '@material-ui/core/colors/red';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
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
      paper: '#FFF',
      login: '#dadde0',
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        verticalAlign: 'top',
      },
    },
    // MuiCssBaseline: {
    //   '@global': {
    //     '*::-webkit-scrollbar': {
    //       width: '0.4em',
    //     },
    //     '*::-webkit-scrollbar-track': {
    //       '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
    //     },
    //     '*::-webkit-scrollbar-thumb': {
    //       backgroundColor: 'rgba(0,0,0,.2)',
    //       outline: '1px solid slategrey',
    //     },
    //   },
    // },
  },
});

export default theme;
