import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4788DC',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#FAFAFA',
      paper: '#FFF',
    },
  },
  overrides: {
    MuiButtonBase: {
      root: {
        verticalAlign: 'top',
      },
    },
    MuiMenuItem: {
      root: {
        '&$selected': {
          backgroundColor: 'rgba(13, 123, 191, 0.1)',
        },
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
